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
        console.log('Connected to SQL Server (OvenMonitor2)');
        return pool;
    })
    .catch(err => console.error('Database connection failed:', err));

// Location API Route
router.get('/OvenMonitor2-requests', async(req, res, next) => {
    try {
        const pool = await poolPromise;
        const query = `
            SELECT 
                    TotalPlan = COUNT(TSO_ID),
                    Confirm = ISNULL(SUM(Confirm),0),
                    ConfirmPercent = ISNULL(SUM(Confirm)/COUNT(TSO_ID),0),
                    Completed = ISNULL(SUM(Completed),0),
                    CompletedPercent = ISNULL(SUM(Completed)/COUNT(TSO_ID),0),
                    Fail = ISNULL(SUM(Fail),0),
                    FailPercent = ISNULL(SUM(Fail)/COUNT(TSO_ID),0),
                    Cancel = ISNULL(SUM(Cancel),0),
                    CancelPercent = ISNULL(SUM(Cancel)/COUNT(TSO_ID),0)
                    FROM (
                    SELECT 
                    TSO_ID,
                    Confirm = CASE WHEN TSO_Status = 'Comfirm' THEN 1 ELSE 0 END,
                    Completed = CASE WHEN TSO_Status = 'Completed' THEN 1 ELSE 0 END,
                    Fail = CASE WHEN TSO_Status = 'Fail' THEN 1 ELSE 0 END,
                    Cancel = CASE WHEN TSO_Status = 'Cancel' THEN 1 ELSE 0 END
                    FROM ASRS_TaskStackerOut 
                    WHERE TSO_InputDate > DATEADD(DAY,-1,FORMAT(DATEADD(DAY,1,CURRENT_TIMESTAMP),'yyyy-MM-dd')) 
                    AND TSO_InputDate <= FORMAT(DATEADD(DAY,1,CURRENT_TIMESTAMP),'yyyy-MM-dd')
                    )x


        `;
        const result = await pool.request().query(query);
        res.json(result.recordset);
    } catch (err) {
        next(err);
    }
});

module.exports = router;