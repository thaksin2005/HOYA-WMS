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
        console.log('Connected to SQL Server (LocationDetail)');
        return pool;
    })
    .catch(err => console.error('Database connection failed:', err));

// Location API Route
router.get('/LocationDetail-requests', async(req, res, next) => {
    try {
        const pool = await poolPromise;
        const query = `
            SELECT  [F_IDFactory]
                    ,[F_Code]
                    ,[F_ShortCode]
                    ,[F_Name]
                    ,[F_City]
                    ,[F_Site]
                    ,[F_IsActive]
                    ,[W_IDWarehouse]
                    ,[W_Code]
                    ,[W_Name]
                    ,[W_IsActive]
                    ,[P_IDPlace]
                    ,[P_Code]
                    ,[P_Name]
                    ,[P_IsAutoStorage]
                    ,[L_IDLocation]
                    ,[L_Code]
                    ,[L_Description]
                    ,[L_VZone]
                    ,[L_HZone]
                    ,[L_IsActive]
                    ,[L_IsBlock]
                    ,[L_IsReserve]
                    ,[S_IDStacker]
                    ,[S_Code]
                    ,[S_Name]
                    ,[S_IsActive]
                    ,[T_IDTray]
                    ,[T_Number]
                    ,[T_Status]
            FROM 
                    [HoyaLens].[dbo].[v_LocationDetail]

        `;
        const result = await pool.request().query(query);
        res.json(result.recordset);
    } catch (err) {
        next(err);
    }
});

module.exports = router;