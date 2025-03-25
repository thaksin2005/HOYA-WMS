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
        console.log('Connected to SQL Server (Highperformance)');
        return pool;
    })
    .catch(err => console.error('Database connection failed:', err));

// Location API Route
router.get('/Highperformance-requests', async(req, res, next) => {
    try {
        const pool = await poolPromise;
        const query = `
        SELECT
             [MHP_ID]
            ,[MHP_SerialUPP]
            ,[MHP_SerialLOW]
            ,[UA_IDCreateBy]
            ,[MHP_CreateOn]
            ,[UA_UpdateBy]
            ,[MHP_UpdateOn]
        FROM 
            [HoyaLens].[dbo].[MoldHighPerformance]

        `;
        const result = await pool.request().query(query);
        res.json(result.recordset);
    } catch (err) {
        next(err);
    }
});

module.exports = router;