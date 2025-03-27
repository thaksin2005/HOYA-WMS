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
    
       SELECT rfid.RFID_ID
                ,ori.ORI_LotNo
                ,tso.TSO_MoldSerialUPP
                ,tso.TSO_MoldSerialLOW
                ,rfid.RFID_Code
                ,rfid.RFID_Info
                ,rfid.RFID_RecordOn
                ,rfid.REL_ID, rfid.REL_IDType
                ,rfid.RFID_IsExport
                ,rfid.TSO_IDTaskStackerOut
        FROM RFID as rfid
        INNER JOIN WH_OutboundRequestItem as ori ON ori.ORI_ID = rfid.REL_ID
        INNER JOIN ASRS_TaskStackerOut as tso ON tso.TSO_ID = rfid.TSO_IDTaskStackerOut

        `;
        const result = await pool.request().query(query);
        res.json(result.recordset);
    } catch (err) {
        next(err);
    }
});

module.exports = router;