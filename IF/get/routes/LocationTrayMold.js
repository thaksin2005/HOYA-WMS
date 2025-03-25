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
        console.log('Connected to SQL Server (LocationTrayMold)');
        return pool;
    })
    .catch(err => console.error('Database connection failed:', err));

// Location API Route
router.get('/LocationTrayMold-requests', async(req, res, next) => {
    try {
        const pool = await poolPromise;
        const query = `
    
        SELECT [T_TrayNumber]
            ,[TP_Position]
            ,[MM_MoldCode]
            ,[MM_TypeShortName]
            ,[MS_IDMoldSerial]
            ,[MS_Serial]
            ,[L_LocationCode]
            ,[S_IDStacker]
        FROM [HoyaLens].[dbo].[v_LocationTrayMold]

        `;
        const result = await pool.request().query(query);
        res.json(result.recordset);
    } catch (err) {
        next(err);
    }
});

module.exports = router;