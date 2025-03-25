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
        console.log('Connected to SQL Server (RFID)');
        return pool;
    })
    .catch(err => console.error('Database connection failed:', err));

// Location API Route
router.get('/RFID-requests', async(req, res, next) => {
    try {
        const pool = await poolPromise;
        const query = `
    
       SELECT   [RFID_ID]
                ,[RFID_Code]
                ,[RFID_Info]
                ,[RFID_RecordOn]
                ,[REL_ID]
                ,[REL_IDType]
                ,[RFID_IsExport]
                ,[TSO_IDTaskStackerOut]
            FROM [HoyaLens].[dbo].[RFID]

        `;
        const result = await pool.request().query(query);
        res.json(result.recordset);
    } catch (err) {
        next(err);
    }
});

module.exports = router;