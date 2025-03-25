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
        console.log('Connected to SQL Server (MachineLog)');
        return pool;
    })
    .catch(err => console.error('Database connection failed:', err));

// Location API Route
router.get('/MachineLog-requests', async(req, res, next) => {
    try {
        const pool = await poolPromise;
        const query = `
            SELECT  
                 [ML_ID]
                ,[ML_JobNumber]
                ,[ML_TrayNumber]
                ,[ML_MoldSerial]
                ,[ML_TrayPosition]
                ,[ML_MsgError]
                ,[ML_RecordOn]
            FROM [HoyaLens].[dbo].[ASRS_MachineLog]


        `;
        const result = await pool.request().query(query);
        res.json(result.recordset);
    } catch (err) {
        next(err);
    }
});

module.exports = router;