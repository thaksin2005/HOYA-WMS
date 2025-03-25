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
        console.log('Connected to SQL Server (LogMoldBlock)');
        return pool;
    })
    .catch(err => console.error('Database connection failed:', err));

// Location API Route
router.get('/LogMoldBlock-requests', async(req, res, next) => {
    try {
        const pool = await poolPromise;
        const query = `
        SELECT 
             [LMB_ID]
            ,[LMB_MoldSerial]
            ,[LMB_BlockStatus]
            ,[LMB_DEFECT_ID]
            ,[LMB_DEFECT_PRCS_ID]
            ,[LMB_MACHINE_ID]
            ,[LMB_RecordOn]
        FROM 
             [HoyaLens].[dbo].[WH_LogMoldBlock]


        `;
        const result = await pool.request().query(query);
        res.json(result.recordset);
    } catch (err) {
        next(err);
    }
});

module.exports = router;