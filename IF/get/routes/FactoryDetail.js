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
        console.log('Connected to SQL Server (FactoryDetail)');
        return pool;
    })
    .catch(err => console.error('Database connection failed:', err));

// Location API Route
router.get('/FactoryDetail-requests', async(req, res, next) => {
    try {
        const pool = await poolPromise;
        const query = `
            SELECT [F_ID]
                ,[F_Code]
                ,[F_ShortCode]
                ,[F_Name]
                ,[F_City]
                ,[F_Site]
                ,[F_Address]
                ,[F_Tel]
                ,[F_Email]
                ,[F_TaxID]
                ,[UA_IDCreateBy]
                ,[F_CreateOn]
                ,[F_IsActive]
                ,[F_Remarks]
                ,[C_IDCompany]
            FROM [HoyaLens].[dbo].[Factory]


        `;
        const result = await pool.request().query(query);
        res.json(result.recordset);
    } catch (err) {
        next(err);
    }
});

module.exports = router;