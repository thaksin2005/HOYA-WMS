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
        console.log('Connected to SQL Server (MoldLimitStock)');
        return pool;
    })
    .catch(err => console.error('Database connection failed:', err));

// Location API Route
router.get('/MoldLimitStock-requests', async (req, res, next) => {
    try {
        const pool = await poolPromise;
        const query = `
        SELECT   [MSL_ID]
            ,[MSL_MaxStock]
            ,[MSL_MinStock]
            ,[MM_IDMoldMaster]
            ,[MM_MoldCode]
            ,[P_IDPlace]
            ,[P_Name]
        FROM 
                [HoyaLens].[dbo].[v_MoldStockLimit]

        `;
        const result = await pool.request().query(query);
        res.json(result.recordset);
    } catch (err) {
        next(err);
    }
});

module.exports = router;