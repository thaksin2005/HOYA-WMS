// const mssql = require("mssql");

// const config = {
//     user: "aitech",
//     password: "ai1234",
//     server: "localhost",
//     database: "HoyaLens",
//     options: {
//         encrypt: true,
//         trustServerCertificate: true
//     }
// };

// async function connectDB() {
//     try {
//         await mssql.connect(config);
//         console.log("Connected to the database.");
//     } catch (err) {
//         console.error("Database connection error:", err);
//     }
// }

// module.exports = { config, connectDB };

// config/dbConfig.js


// const sql = require('mssql');

// const config = {
//     user: process.env.DB_USER || "aitech",
//     password: process.env.DB_PASSWORD || "ai1234",
//     server: process.env.DB_SERVER || "localhost",
//     database: process.env.DB_NAME || "HoyaLens",
//     options: {
//         encrypt: false, // Set to true if using encryption
//         trustServerCertificate: true // Set to false in production if you have proper certificates
//     }
// };

// const connectDB = async() => {
//     try {
//         await sql.connect(config);
//         console.log("Connected to SQL Server");
//     } catch (err) {
//         console.error("Database connection failed:", err);
//     }
// };

// module.exports = { connectDB, sql };



const sql = require('mssql');

// กำหนดค่า config สำหรับการเชื่อมต่อฐานข้อมูล
const config = {
    user: process.env.DB_USER || "aitech",
    password: process.env.DB_PASSWORD || "ai1234",
    server: process.env.DB_SERVER || "localhost",
    database: process.env.DB_NAME || "HoyaLens",
    options: {
        encrypt: false,  // ถ้าใช้การเข้ารหัส SSL ให้ตั้งเป็น true
        trustServerCertificate: true  // ตั้งเป็น false ใน production ถ้ามี certificate ที่ถูกต้อง
    }
};

// สร้าง pool การเชื่อมต่อฐานข้อมูล
const poolPromise = sql.connect(config)
    .then(pool => pool)
    .catch(err => {
        console.error("Database connection failed:", err);
        throw err;
    });

// ฟังก์ชันเพื่อดึง pool สำหรับการใช้งาน
const getPool = () => poolPromise;

// ฟังก์ชันสำหรับเชื่อมต่อกับฐานข้อมูล
const connectDB = async () => {
    try {
        await sql.connect(config);
        console.log("Connected to SQL Server");
    } catch (err) {
        console.error("Database connection failed:", err);
    }
};

// ส่งออกฟังก์ชันที่จำเป็น
module.exports = { connectDB, sql, getPool };  // ส่งออก getPool
