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
        console.log('Connected to SQL Server (StackerGripperDetail)');
        return pool;
    })
    .catch(err => console.error('Database connection failed:', err));

// Location API Route
router.get('/StackerGripperDetail-requests', async(req, res, next) => {
    try {
        const pool = await poolPromise;
        const query = `
            SELECT [S_Code]
                ,[S_Name]
                ,[S_Description]
                ,[W_Name]
                ,[S_IsActive]
                ,[SG_ID]
                ,[SG_Code]
                ,[SG_Position]
                ,[SG_MaxColumn]
                ,[SG_IsActive]
                ,[MG_Code]
                ,[MG_Name]
            FROM [HoyaLens].[dbo].[v_StackerGripperDetail]

        `;
        const result = await pool.request().query(query);
        res.json(result.recordset);
    } catch (err) {
        next(err);
    }
});

module.exports = router;