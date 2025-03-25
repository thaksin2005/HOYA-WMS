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
        console.log('Connected to SQL Server (InboundDetail)');
        return pool;
    })
    .catch(err => console.error('Database connection failed:', err));

// Inbound API Route
router.get('/InboundDetail-requests', async(req, res, next) => {
    try {
        const pool = await poolPromise;
        const query = `
           SELECT [IR_IDInboundRequest]
            ,[IR_Number]
            ,[IR_JobNumber]
            ,[IR_Status]
            ,[F_Name]
            ,[W_Name]
            ,[P_Name]
            ,[IR_InterfaceFile]
            ,[UA_Code]
            ,[UA_Fullname]
            ,[IR_RecordOn]
        FROM [HoyaLens].[dbo].[v_InboundDetail]

        `;
        const result = await pool.request().query(query);
        res.json(result.recordset);
    } catch (err) {
        next(err);
    }
});

module.exports = router;