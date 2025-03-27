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
        console.log('Connected to SQL Server (InboundItempDetail)');
        return pool;
    })
    .catch(err => console.error('Database connection failed:', err));

// Inbound API Route
router.get('/InboundItempDetail-requests', async(req, res, next) => {
    try {
        const pool = await poolPromise;
        const query = `
            SELECT [IR_IDInboundRequest]
                ,[InboundNumber]
                ,[InboundStatus]
                ,[InboundRecordOn]
                ,[InboundJobNumber]
                ,[InboundInterfaceFile]
                ,[UserAccountID_IR]
                ,[UserAccountCode_IR]
                ,[UserAccountFullName_IR]
                ,[P_IDPlace]
                ,[PlaceCode]
                ,[PlaceName]
                ,[IRI_IDInboundRequestItem]
                ,[IRI_UpdateOn]
                ,[InboundItemStatus]
                ,[InboundItemMsgError]
                ,[UserAccountID_IRI]
                ,[UserAccountCode_IRI]
                ,[UserAccountFullName_IRI]
                ,[MoldCode]
                ,[MoldSerial]
                ,[MoldQty]
                ,[MoldReworkCount]
                ,[MoldPlantNo]
                ,[MoldStockType]
                ,[MoldPlaceNo]
                ,[MoldTransactionCD]
                ,[MoldProgramID]
                ,[EmpNo]
                ,[MoldWorkStation]
                ,[MoldLotNo]
                ,[MoldSndrcvPlantNo]
                ,[MoldSndrcvStockType]
                ,[MoldSndrcvPlaceNo]
                ,[MoldSndrcvTransactionCD]
                ,[TaskStatus]
                ,[TrayNumber]
                ,[TrayPosition]
                ,[ToLocation]
                ,[OrderNo]
            FROM [HoyaLens].[dbo].[v_InboundItemDetail]

        `;
        const result = await pool.request().query(query);
        res.json(result.recordset);
    } catch (err) {
        next(err);
    }
});

module.exports = router;