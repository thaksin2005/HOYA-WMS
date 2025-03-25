const express = require('express');
const sql = require('mssql');

const router = express.Router();

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },
};

const poolPromise = new sql.ConnectionPool(dbConfig)
    .connect()
    .then(pool => {
        console.log('Connected to SQL Server (OvenMonitorGrid)');
        return pool;
    })
    .catch(err => console.error('Database connection failed:', err));

// Location API Route
router.get('/OvenMonitorGrid-requests', async(req, res, next) => {
    try {
        const pool = await poolPromise;
        const query = `
            SELECT 
                TSO_Status,TSO_OrderID,TSO_LotNo,TSO_CastOvenNo,TSO_OvenInputTime,TSO_OvenHHTime,TSO_OvenMMTime,TSO_ScheduleOn,
                TSO_LocationUPP,TSO_TrayNumberUPP,TSO_PositionUPP,TSO_MoldCodeUPP,TSO_MoldSerialUPP,
                TSO_LocationLOW,TSO_TrayNumberLOW,TSO_PositionLOW,TSO_MoldCodeLOW,TSO_MoldSerialLOW
                FROM ASRS_TaskStackerOut WHERE TSO_BatchID = ''
        `;
        const result = await pool.request().query(query);
        res.json(result.recordset);
    } catch (err) {
        next(err);
    }
});

module.exports = router;