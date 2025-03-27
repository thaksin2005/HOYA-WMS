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
        console.log('Connected to SQL Server (PercentOutboundItemDetail)');
        return pool;
    })
    .catch(err => console.error('Database connection failed:', err));

// Location API Route
router.get('/PercentOutboundItemDetail-requests', async(req, res, next) => {
    try {
        const pool = await poolPromise;
        const query = `
             SELECT 
                ROW_NUMBER() OVER (PARTITION BY InputDate,OvenInputTime,CastOvenNo ORDER BY OutboundNumber,InputDate) AS RowNum,
                FORMAT(DATEADD(HOUR, 7, InputDate), 'yyyy-MM-dd HH:mm:ss') as InputDate,
                OvenInputTime,CastOvenNo,
                OutboundItemStatus,
                MoldUpper,MoldUpperName,MoldSerialUPP,MoldLower,MoldLowerName,MoldSerialLOW,
                TotalItem = COUNT(ORI_IDOutboundRequestItem),
                TotalMatching = SUM(IsMatching),
                PercentMatching = ROUND((SUM(IsMatching)*1.0)/COUNT(ORI_IDOutboundRequestItem), 2),
                TotalWaitConfirm = SUM(IsWaitConfirm),
                PercentWaitConfirm = ROUND((SUM(IsWaitConfirm)*1.0)/COUNT(ORI_IDOutboundRequestItem), 2),
                TotalProcess = SUM(IsProcess),
                PercentProcess = ROUND((SUM(IsProcess)*1.0)/COUNT(ORI_IDOutboundRequestItem), 2),
                TotalPicking = SUM(IsPicking),
                PercentPicking = ROUND((SUM(IsPicking)*1.0)/COUNT(ORI_IDOutboundRequestItem), 2),
                TotalCompleted = SUM(IsCompleted),
                PercentCompleted = ROUND((SUM(IsCompleted)*1.0)/COUNT(ORI_IDOutboundRequestItem), 2)
                FROM (
                SELECT
                orx.OR_ID as OR_IDOutboundRequest,orx.OR_Number as OutboundNumber,orx.OR_Status as OutboundStatus,
                orx.OR_JobNumber as OutboundJobNumber,orx.OR_InterfaceFile as OutboundInterfaceFile,
                ua_orx.UA_ID as UserAccountID_OR,ua_orx.UA_Code as UserAccountCode_OR,ua_orx.UA_Fullname as UserAccountFullName_OR,
                p.P_ID as P_IDPlace,p.P_Code as PlaceCode,p.P_Name as PlaceName,
                ori.ORI_ID as ORI_IDOutboundRequestItem,ori.ORI_Status as OutboundItemStatus,ori.ORI_ProductionOrder as ProductionOrder,ori.ORI_OrderDate as OrderDate,
                FORMAT(DATEADD(HOUR, 7, ori.ORI_InputDate), 'yyyy-MM-dd HH:mm:ss') as InputDate,
                ori.ORI_FactoryID as FactoryID,ori.ORI_Stie as Stie,ori.ORI_ProductionType as ProductionType,
                ori.ORI_ProductionNo as ProductionNo,ori.ORI_RequestDate as RequestDate,ori.ORI_SendID as SendID,ori.ORI_InputID as InputID,ori.ORI_Test as Test,
                ori.ORI_Edge as Edge,ori.ORI_LotMsg as LotMsg,ori.ORI_LotType as LotType,ori.ORI_RouteID as RouteID,
                ori.ORI_LensFlag as LensFlag,ori.ORI_LensFlagDesc as LensFlagDesc,ori.ORI_ProductDIA as ProductDIA,ori.ORI_EndItemName as EndItemName,
                ori.ORI_CastOvenNo as CastOvenNo,ori.ORI_OvenInputTime as OvenInputTime,ori.ORI_OvenHHTime as OvenHHTime,ori.ORI_OvenMMTime as OvenMMTime,
                ori.ORI_MoldPlace as MoldPlace,ori.ORI_Warehouse as Warehouse,ori.ORI_Instruction as Instruction,ori.ORI_LotNo as LotNo,
                ori.ORI_CurrentRouteSeq as CurrentRouteSeq,ori.ORI_CurrentProcessID as CurrentProcessID,ori.ORI_CurrentProcessName as CurrentProcessName,
                ori.ORI_CurrentProcessDateTime as CurrentProcessDateTime,ori.ORI_PowerSeq as PowerSeq,ori.ORI_IndexFlag as IndexFlag,
                ori.ORI_IndexName as IndexName,ori.ORI_FinishSPH as FinishSPH,ori.ORI_FinishCYL as FinishCYL,ori.ORI_SemiBC as SemiBC,
                ori.ORI_SemiCT as SemiCT,ori.ORI_Addition as Addition,ori.ORI_RL as RL,ori.ORI_VerticalText as VerticalText,
                ori.ORI_HorizontalText as HorizontalText,ori.ORI_InputQty as InputQty,ori.ORI_CreateDateTime as CreateDateTime,
                ori.ORI_CT as CT,ori.ORI_TapeLength as TapeLength,ori.ORI_TapeAngle as TapeAngle,ori.ORI_TapeOverlap as TapeOverlap,
                ori.ORI_TapeWidth as TapeWidth,ori.ORI_TargetOn as TargetOn,
                ori.MS_IDUpperMold,ori.ORI_MoldUpper as MoldUpper,ori.ORI_MoldUpperName as MoldUpperName,ori.ORI_MoldUpperDIA as MoldUpperDIA,
                tso.TSO_MoldSerialUPP as MoldSerialUPP,TSO_TrayNumberUPP as TrayNumberUPP,TSO_PositionUPP as PositionUPP,TSO_LocationUPP as LocationUPP,
                ori.MS_IDLowerMold,ori.ORI_MoldLower as MoldLower,ori.ORI_MoldLowerName as MoldLowerName,ori.ORI_MoldLowerDIA as MoldLowerDIA,
                tso.TSO_MoldSerialLOW as MoldSerialLOW,TSO_TrayNumberLOW as TrayNumberLOW,TSO_PositionLOW as PositionLOW,TSO_LocationLOW as LocationLOW,
                IsMatching = CASE WHEN TSO_Status = 'Matching' THEN 1 ELSE 0 END,
                IsWaitConfirm = CASE WHEN TSO_Status = 'Wait Confirm' THEN 1 ELSE 0 END,
                IsProcess = CASE WHEN TSO_Status = 'Process' THEN 1 ELSE 0 END,
                IsPicking = CASE WHEN TSO_Status = 'Picking' THEN 1 ELSE 0 END,
                IsCompleted = CASE WHEN TSO_Status = 'Completed' THEN 1 ELSE 0 END
                FROM WH_OutboundRequest orx 
                LEFT JOIN WH_OutboundRequestItem ori ON orx.OR_ID = ori.REL_ID AND ori.REL_IDType = 'OR_ID'
                LEFT JOIN Place p ON orx.P_IDPlace = p.P_ID
                LEFT JOIN SYS_UserAccount ua_orx ON orx.UA_IDUserAccount = ua_orx.UA_ID
                LEFT JOIN ASRS_TaskStackerOut tso ON ori.ORI_ID = tso.REL_ID AND tso.REL_IDType = 'ORI_ID'
                )x GROUP BY GROUPING SETS (
                (
                OR_IDOutboundRequest,OutboundNumber,ORI_IDOutboundRequestItem,OutboundItemStatus,InputDate,OvenInputTime,CastOvenNo,
                MoldUpper,MoldUpperName,MoldSerialUPP,MoldLower,MoldLowerName,MoldSerialLOW
                ),
                (InputDate,OvenInputTime,CastOvenNo),
                ()
                ) 
                

        `;
        const result = await pool.request().query(query);
        res.json(result.recordset);
    } catch (err) {
        next(err);
    }
});

module.exports = router;