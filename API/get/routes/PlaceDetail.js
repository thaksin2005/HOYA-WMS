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
        console.log('Connected to SQL Server (PlaceDetail)');
        return pool;
    })
    .catch(err => console.error('Database connection failed:', err));

// Location API Route
router.get('/PlaceDetail-requests', async(req, res, next) => {
    try {
        const pool = await poolPromise;
        const query = `

        SELECT [W_Fullname]
            ,[P_IDPlace]
            ,[P_Code]
            ,[P_Name]
            ,[P_IsAutoStorage]
            ,[P_IsActive]
            ,[UA_Code]
            ,[UA_Fullname]
        FROM 
            [HoyaLens].[dbo].[v_PlaceDetail]

        `;
        const result = await pool.request().query(query);
        res.json(result.recordset);
    } catch (err) {
        next(err);
    }
});

module.exports = router;