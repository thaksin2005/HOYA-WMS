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

const poolPromise = new sql.ConnectionPool(dbConfig)
    .connect()
    .then(pool => {
        console.log('Connected to SQL Server (OutboundDetail)');
        return pool;
    })
    .catch(err => console.error('Database connection failed:', err));


router.get('/OutboundDetail-requests', async(req, res, next) => {
    try {
        const pool = await poolPromise;
        const query = `
          SELECT [OR_IDOutboundRequest]
            ,[OR_Number]
            ,[OR_JobNumber]
            ,[OR_Status]
            ,[P_Name]
            ,[OR_InterfaceFile]
            ,[UA_Code]
            ,[UA_Fullname]
            ,FORMAT(DATEADD(HOUR, 0, [OR_RecordOn]), 'yyyy-MM-dd HH:mm:ss') as [OR_RecordOn]
        FROM [HoyaLens].[dbo].[v_OutboundDetail]


        `;
        const result = await pool.request().query(query);
        res.json(result.recordset);
    } catch (err) {
        next(err);
    }
});


module.exports = router;