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
        console.log('Connected to SQL Server (TaskStacker_InProgressDetail)');
        return pool;
    })
    .catch(err => console.error('Database connection failed:', err));

// Location API Route
router.get('/TaskStacker_InProgressDetail-requests', async(req, res, next) => {
    try {
        const pool = await poolPromise;
        const query = `
            SELECT [TS_ID]
                ,[TS_Job]
                ,[REL_ID]
                ,[REL_IDType]
                ,[StackerCode]
                ,[StackerStatus]
                ,[GripperCode]
                ,[SG_Position]
                ,[TrayNumber]
                ,[TS_FromLocation]
                ,[TS_ToLocation]
                ,[TaskStatus]
            FROM [HoyaLens].[dbo].[v_TaskStacker_InProgressDetail]
        `;
        const result = await pool.request().query(query);
        res.json(result.recordset);
    } catch (err) {
        next(err);
    }
});

module.exports = router;