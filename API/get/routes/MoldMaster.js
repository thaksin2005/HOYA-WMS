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
        console.log('Connected to SQL Server (MoldMaster)');
        return pool;
    })
    .catch(err => console.error('Database connection failed:', err));

// Location API Route
router.get('/MoldMaster-requests', async(req, res, next) => {
    try {
        const pool = await poolPromise;
        const query = `
        SELECT
                 [MM_ID]
                ,[MM_MoldCode]
                ,[MM_PlantNumber]
                ,[MM_StockType]
                ,[MM_LensType]
                ,[MM_LensTypeName]
                ,[MM_IndexNo]
                ,[MM_IndexName]
                ,[MM_FocusType]
                ,[MM_FocusName]
                ,[MM_TypeNo]
                ,[MM_TypeShortName]
                ,[MM_UpLowNo]
                ,[MM_UpLowName]
                ,[MM_DIANumber]
                ,[MM_LensName]
                ,[MM_SandBlast]
                ,[MM_Diaidama]
                ,[MM_EngMkNo]
                ,[MM_TagTitleNo]
                ,[MM_Create]
                ,[MM_Update]
                ,[MM_MoldDesign]
                ,[MM_MoldActualDiameter]
                ,[MM_MoldSlideGuide]
                ,[MM_MoldAccountGroup]
                ,[MM_MoldInvoiceName]
                ,[MM_Sandblast1]
                ,[MM_Sandblast2]
                ,[MM_Sandblast3]
                ,[MM_EngraveMark]
                ,[MM_SvRadius]
                ,[MM_SvStepCut]
                ,[MM_SVTapping]
                ,[MM_R1]
                ,[MM_R2]
                ,[MM_CT]
                ,[MM_Acid]
                ,[MM_DiaTolerance]
                ,[MM_TotalD1]
                ,[MM_TotalD2]
                ,[MM_HolderD1]
                ,[MM_HolderD2]
                ,[MM_DocumentNo]
                ,[MM_SVCode]
                ,[MM_ItemNumber]
                ,[MM_Class]
                ,[UA_IDCreateBy]
                ,[UA_CodeCreateBy]
                ,[UA_FullnameCreateBy]
                ,[MM_CreateOn]
                ,[UA_IDUpdateBy]
                ,[UA_CodeUpdateBy]
                ,[UA_FullnameUpdateBy]
                ,[MM_UpdateOn]
                ,[MM_IsActive]
            FROM [HoyaLens].[dbo].[v_MoldMaster]
        `;
        const result = await pool.request().query(query);
        res.json(result.recordset);
    } catch (err) {
        next(err);
    }
});

module.exports = router;