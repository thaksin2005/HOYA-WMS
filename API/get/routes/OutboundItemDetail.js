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
        console.log('Connected to SQL Server (OutboundItemDetail)');
        return pool;
    })
    .catch(err => console.error('Database connection failed:', err));


router.get('/OutboundItemDetail-requests', async(req, res, next) => {
    try {
        const pool = await poolPromise;
        const query = `
    SELECT [OR_IDOutboundRequest]
        ,[OutboundNumber]
        ,[OutboundStatus]
        ,[OutboundJobNumber]
        ,[OutboundInterfaceFile]
        ,[UserAccountID_OR]
        ,[UserAccountCode_OR]
        ,[UserAccountFullName_OR]
        ,[P_IDPlace]
        ,[PlaceCode]
        ,[PlaceName]
        ,[ORI_IDOutboundRequestItem]
        ,[OutboundItemStatus]
        ,[ProductionOrder]
        ,[OrderDate]
        ,[InputDate]
        ,[FactoryID]
        ,[Stie]
        ,[ProductionType]
        ,[ProductionNo]
        ,[RequestDate]
        ,[SendID]
        ,[InputID]
        ,[Test]
        ,[Edge]
        ,[LotMsg]
        ,[LotType]
        ,[RouteID]
        ,[LensFlag]
        ,[LensFlagDesc]
        ,[ProductDIA]
        ,[EndItemName]
        ,[CastOvenNo]
        ,[OvenInputTime]
        ,[OvenHHTime]
        ,[OvenMMTime]
        ,[MoldPlace]
        ,[Warehouse]
        ,[Instruction]
        ,[LotNo]
        ,[CurrentRouteSeq]
        ,[CurrentProcessID]
        ,[CurrentProcessName]
        ,[CurrentProcessDateTime]
        ,[PowerSeq]
        ,[IndexFlag]
        ,[IndexName]
        ,[FinishSPH]
        ,[FinishCYL]
        ,[SemiBC]
        ,[SemiCT]
        ,[Addition]
        ,[RL]
        ,[VerticalText]
        ,[HorizontalText]
        ,[InputQty]
        ,[CreateDateTime]
        ,[CT]
        ,[TapeLength]
        ,[TapeAngle]
        ,[TapeOverlap]
        ,[TapeWidth]
        ,[TargetOn]
        ,[MS_IDUpperMold]
        ,[MoldUpper]
        ,[MoldUpperName]
        ,[MoldUpperDIA]
        ,[MoldSerialUPP]
        ,[TrayNumberUPP]
        ,[PositionUPP]
        ,[LocationUPP]
        ,[MS_IDLowerMold]
        ,[MoldLower]
        ,[MoldLowerName]
        ,[MoldLowerDIA]
        ,[MoldSerialLOW]
        ,[TrayNumberLOW]
        ,[PositionLOW]
        ,[LocationLOW]
    FROM [HoyaLens].[dbo].[v_OutboundItemDetail]


        `;
        const result = await pool.request().query(query);
        res.json(result.recordset);
    } catch (err) {
        next(err);
    }
});


module.exports = router;