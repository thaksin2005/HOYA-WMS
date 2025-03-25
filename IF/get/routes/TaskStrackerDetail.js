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
        console.log('Connected to SQL Server (TaskStrackerDetail)');
        return pool;
    })
    .catch(err => console.error('Database connection failed:', err));

// Location API Route
router.get('/TaskStrackerDetail-requests', async(req, res, next) => {
    try {
        const pool = await poolPromise;
        const query = `
            SELECT [TS_OrderID]
                ,[TS_ID]
                ,[TS_Job]
                ,[Stacker]
                ,[SG_Code]
                ,[TS_TrayNumber]
                ,[TS_FromLocation]
                ,[TS_ToLocation]
                ,[TS_Status]
                ,[TS_CreateOn]
                ,[MS_IDMoldSerial]
                ,[MS_Serial]
                ,[TS_FromPosition]
                ,[TS_ToPosition]
            FROM [HoyaLens].[dbo].[v_TaskStackerDetail]
        `;
        const result = await pool.request().query(query);
        res.json(result.recordset);
    } catch (err) {
        next(err);
    }
});

module.exports = router;