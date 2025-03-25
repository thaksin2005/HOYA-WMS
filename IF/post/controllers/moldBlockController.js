// const { sql, poolPromise } = require("../config/dbConfig");
// const axios = require("axios");

// let lastData = []; // เก็บข้อมูลก่อนหน้าเพื่อตรวจสอบการเปลี่ยนแปลง

// const getMoldBlockData = async() => {
//     try {
//         const pool = await poolPromise;
//         const result = await pool
//             .request()
//             .query("SELECT MoldSerial, MoldStatus, Output_Msg FROM v_MoldBlock");

//         if (result.recordset.length > 0) {
//             const newData = result.recordset;

//             // ตรวจสอบว่ามีการเปลี่ยนแปลงหรือไม่
//             if (JSON.stringify(newData) !== JSON.stringify(lastData)) {
//                 console.log("Data changed, sending to API...");
//                 await sendToAPI(newData);
//                 lastData = newData; // อัปเดตข้อมูลล่าสุด
//             }
//         }
//     } catch (error) {
//         console.error("Error fetching MoldBlock data:", error.message);
//     }
// };

// // ฟังก์ชันส่งข้อมูลไปยัง API
// const sendToAPI = async(data) => {
//     try {
//         const response = await axios.post(
//             "http://10.24.172.64:8090/HOYA/Service/RabbitMQ/UpdateMoldBlock", { data }
//         );
//         console.log("Data sent successfully:", response.data);
//     } catch (error) {
//         console.error("Error sending data to API:", error.message);
//     }
// };

// // ตั้งให้ดึงข้อมูลทุกๆ 5 วินาที
// setInterval(getMoldBlockData, 5000);

// module.exports = { getMoldBlockData };

// const { sql } = require("../config/dbConfig");
// const axios = require("axios");

// const API_URL = "http://10.24.172.64:8090/HOYA/Service/AutoPickMold/UpdateMoldBlock";

// let previousData = new Map();

// async function checkAndSendMoldBlockData() {
//     try {
//         const result = await sql.query(`
//       SELECT [MoldSerial], [MoldStatus], [Output_Msg]
//       FROM [HoyaLens].[dbo].[v_MoldBlock]
//     `);

//         const newData = new Map();

//         result.recordset.forEach(row => {
//             const key = row.MoldSerial;
//             newData.set(key, JSON.stringify(row)); // ใช้ JSON เปรียบเทียบข้อมูล
//         });

//         for (const [key, value] of newData.entries()) {
//             if (!previousData.has(key) || previousData.get(key) !== value) {
//                 await axios.post(API_URL, JSON.parse(value));
//                 console.log(`Sent update for MoldSerial: ${key}`);
//             }
//         }

//         previousData = newData;
//     } catch (err) {
//         console.error("Error fetching mold block data", err);
//     }
// }

// module.exports = { checkAndSendMoldBlockData };

// moldBlockController.js
const { getPool } = require('../config/dbConfig'); // นำเข้า getPool จาก dbConfig
const axios = require('axios');

let lastData = [];

const fetchAndUpdateMoldBlock = async () => {
    try {
        const pool = await getPool(); // รอให้การเชื่อมต่อฐานข้อมูลเสร็จสิ้น
        if (!pool) {
            console.error('Database connection not established');
            return;
        }

        // ทำการ query จากฐานข้อมูล
        const result = await pool.request().query(`
            SELECT [MoldSerial], [MoldStatus] FROM [HoyaLens].[dbo].[v_MoldBlock]
        `);

        const newData = result.recordset;
        if (JSON.stringify(newData) !== JSON.stringify(lastData)) {
            lastData = newData;
            await sendDataToAPI(newData); // ส่งข้อมูลไปยัง API
        }
    } catch (error) {
        console.error('Error fetching mold block data:', error);
    }
};

const sendDataToAPI = async (data) => {
    try {
        for (const row of data) {
            await axios.post('http://10.24.172.64:8090/HOYA/Service/AutoPickMold/UpdateMoldBlock', {
                MOLD_SERIAL: row.MoldSerial,
                BLOCK_STATUS: row.MoldStatus ? 1 : 0  // ส่ง 1 สำหรับ true และ 0 สำหรับ false
            });
        }
        console.log('Data successfully sent to API');
    } catch (error) {
        console.error('Error sending data to API:', error);
    }
};

module.exports = { fetchAndUpdateMoldBlock };
