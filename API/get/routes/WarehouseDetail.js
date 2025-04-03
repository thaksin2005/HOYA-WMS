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
        console.log('Connected to SQL Server (WarehouseDetail)');
        return pool;
    })
    .catch(err => console.error('Database connection failed:', err));

// Location API Route
router.get('/WarehouseDetail-requests', async(req, res, next) => {
    try {
        const pool = await poolPromise;
        const query = `

            SELECT [W_ID]
                ,[W_Code]
                ,[W_Name]
                ,[F_IDFactory]
                ,[UA_IDCreateBy]
                ,[W_CreateOn]
                ,[W_IsActive]
                ,[W_Remarks]
            FROM [Hoyalens].[dbo].[Warehouse]

        `;
        const result = await pool.request().query(query);
        res.json(result.recordset);
    } catch (err) {
        next(err);
    }
});

module.exports = router;