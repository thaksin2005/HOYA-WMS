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
        console.log('Connected to SQL Server (MoldSerialDetail)');
        return pool;
    })
    .catch(err => console.error('Database connection failed:', err));

// Location API Route
router.get('/MoldSerialDetail-requests', async(req, res, next) => {
    try {
        const pool = await poolPromise;
        const query = `
SELECT [MM_MoldCode]
      ,[MM_UpLowNo]
      ,[MM_UpLowName]
      ,[MM_Class]
      ,[MS_IDMoldSerial]
      ,[MS_Serial]
      ,[MS_Lot]
      ,[MS_Status]
      ,[MS_CycleCount]
      ,[MS_IsHold]
      ,[T_TrayNumber]
      ,[Position]
      ,[L_Code]
      ,[PW_IDProductionWorkflow]
      ,[PW_Code]
      ,[PW_Name]
  FROM 
      [HoyaLens].[dbo].[v_MoldSerialDetail]

        `;
        const result = await pool.request().query(query);
        res.json(result.recordset);
    } catch (err) {
        next(err);
    }
});

module.exports = router;