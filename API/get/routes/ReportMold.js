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
        console.log('Connected to SQL Server (FactoryDetail)');
        return pool;
    })
    .catch(err => console.error('Database connection failed:', err));

// Location API Route
router.get('/ReportMold-requests', async(req, res, next) => {
    try {
        const pool = await poolPromise;
        const query = `
            SELECT 
            MoldCode = mm.MM_MoldCode,LensName = mm.MM_LensName,Serial = ms.MS_Serial,MoldType = mm.MM_UpLowName,
            TaryNumber = t.T_Number,Location = l.L_Code,Position = tp.TP_Position,ProcessCode = pw.PW_Code,ProcessName = pw.PW_Name
            FROM MoldSerial ms 
            INNER JOIN MoldMaster mm ON ms.MM_IDMoldMaster = mm.MM_ID
            LEFT JOIN PD_ProductionWorkflow pw ON ms.PW_IDProductionWorkflow = pw.PW_ID
            LEFT JOIN WH_TrayPosition tp ON ms.MS_ID = tp.MS_IDMoldSerial
            LEFT JOIN WH_Tray t ON tp.T_IDTray = t.T_ID
            LEFT JOIN WH_Location l ON t.T_ID = l.T_IDTray


        `;
        const result = await pool.request().query(query);
        res.json(result.recordset);
    } catch (err) {
        next(err);
    }
});

module.exports = router;