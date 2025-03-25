const express = require('express');
const sql = require('mssql');
const router = express.Router();
const moment = require('moment-timezone');

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
        console.log('Connected to SQL Server (MoldBlock)');
        return pool;
    })
    .catch(err => console.error('Database connection failed:', err));


router.get('/MoldBlock-requests', async(req, res, next) => {
    try {
        const pool = await poolPromise;
        const query = `
             SELECT  [MoldSerial]
                    ,[MoldStatus]
                    ,[Output_Msg]
                FROM [HoyaLens].[dbo].[v_MoldBlock]
            `;
        const result = await pool.request().query(query);

        res.json({
            message: "Mold Block",
            date: moment().tz("Asia/Bangkok").format("YYYY-MM-DD HH:mm:ss"),
            data: result.recordset
        });
    } catch (err) {
        next(err);
    }
});


module.exports = router;