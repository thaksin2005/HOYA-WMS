const express = require('express');
const sql = require('mssql');

const router = express.Router();

// SQL Server Configuration
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

// Connection Pool
const poolPromise = new sql.ConnectionPool(dbConfig)
    .connect()
    .then(pool => {
        console.log('Connected to SQL Server (UppLowReturn)');
        return pool;
    })
    .catch(err => console.error('Database connection failed:', err));

// API Route
router.get('/UppLowReturn-requests', async(req, res, next) => {
    try {
        const pool = await poolPromise;
        const query = `
            SELECT ori.*, 
                tso.TSO_ScheduleOn, 
                tso.TSO_Status,TSO_OrderId ,
                FORMAT(DATEADD(HOUR, 7, msh_upp.MSH_MoldReturnOn), 'yyyy-MM-dd HH:mm:ss') AS UPP_ReturnOn, 
                FORMAT(DATEADD(HOUR, 7, msh_low.MSH_MoldReturnOn), 'yyyy-MM-dd HH:mm:ss') AS LOW_ReturnOn
            FROM WH_OutboundRequestItem ori
            LEFT JOIN ASRS_TaskStackerOut tso ON tso.REL_IDType = 'ORI_ID' AND ori.ORI_ID = tso.REL_ID
            LEFT JOIN MoldSerialHistory msh_upp ON tso.TSO_ID = msh_upp.TSO_IDTaskStackerOut AND tso.TSO_MoldSerialUPP = msh_upp.MS_Serial
            LEFT JOIN MoldSerialHistory msh_low ON tso.TSO_ID = msh_low.TSO_IDTaskStackerOut AND tso.TSO_MoldSerialLOW = msh_low.MS_Serial
        `;
        const result = await pool.request().query(query);
        res.json(result.recordset);
    } catch (err) {
        next(err);
    }
});

module.exports = router;