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
            SELECT 
                [W_Fullname]
                ,[P_IDPlace]
                ,[P_Code]
                ,[P_Name]
                ,[P_IsAutoStorage]
                ,[P_IsActive]
                ,[UA_Code]
                ,[UA_Fullname]
                ,[S_IDStacker]
                ,[S_Code]
                ,[S_Name]
                ,[S_IsActive]
                ,[MG_Name]
                ,[L_IDLocation]
                ,[L_Code]
                ,[L_Description]
                ,[L_VZone]
                ,[L_Class]
                ,[L_IsActive]
                ,[L_IsBlock]
                ,[L_IsReserve]
                ,[Row]
                ,[Col]
                ,[Lvl]
                ,[T_IDTray]
                ,[T_Number]
                ,[T_Status]
            FROM [HoyaLens].[dbo].[v_LocationDetail]

        `;
        const result = await pool.request().query(query);
        res.json(result.recordset);
    } catch (err) {
        next(err);
    }
});

module.exports = router;