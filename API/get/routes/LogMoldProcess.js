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
        console.log('Connected to SQL Server (LogMoldProcess)');
        return pool;
    })
    .catch(err => console.error('Database connection failed:', err));

// Location API Route
router.get('/LogMoldProcess-requests', async(req, res, next) => {
    try {
        const pool = await poolPromise;
        const query = `
        SELECT 
            [LMP_ID]
            ,[LMP_MoldSerial]
            ,[LMP_PRCS_ID]
            ,[LMP_PRCS_NAME]
            ,[LMP_PRCS_DATETIME]
            ,[LMP_RecordOn]
        FROM 
            [HoyaLens].[dbo].[WH_LogMoldProcess]


        `;
        const result = await pool.request().query(query);
        res.json(result.recordset);
    } catch (err) {
        next(err);
    }
});

module.exports = router;