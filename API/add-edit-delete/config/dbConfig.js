// config/dbConfig.js
require("dotenv").config();
const sql = require("mssql");

const config = {
    user: process.env.DB_USER, 
    password: process.env.DB_PASSWORD, 
    server: process.env.DB_SERVER, 
    database: process.env.DB_NAME, 
    options: {
        encrypt: false, 
        trustServerCertificate: true, 
    },
};

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then((pool) => {
        console.log("Connected to MSSQL");
        return pool;
    })
    .catch((err) => {
        console.log("Database Connection Failed! ", err);
        throw err;
    });

module.exports = { sql, poolPromise };