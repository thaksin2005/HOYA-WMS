const sql = require("mssql");
const dbConfig = require("../config/dbConfig");
const moment = require("moment"); // ✅ เพิ่ม moment.js

const upLoadMoldProcess = async(req, res) => {
    try {
        const { MoldSerial, PRCS_ID, PRCS_Name, PRCS_DATE_TIME } = req.body;

        if (!MoldSerial || !PRCS_ID || !PRCS_Name || !PRCS_DATE_TIME) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // แปลงวันที่ให้แน่ใจว่าเป็น Date
        const processDateTime = new Date(PRCS_DATE_TIME);
        if (isNaN(processDateTime)) {
            return res.status(400).json({ error: "Invalid date format" });
        }

        const pool = await sql.connect(dbConfig);
        const result = await pool.request()
            .input("MoldSerial", sql.NVarChar(31), MoldSerial)
            .input("PRCS_ID", sql.NVarChar(100), PRCS_ID)
            .input("PRCS_Name", sql.NVarChar(100), PRCS_Name)
            .input("PRCS_DATE_TIME", sql.DateTime, processDateTime)
            .execute("WH_UpdateMoldProcess");

        const currentDateTime = moment().format("YYYY-MM-DD HH:mm:ss");
        const message = (result.recordset && result.recordset.length > 0) ?
            result.recordset[0].Output_Text :

            "Success";

        res.json({
            message: "Success",
            timestamp: currentDateTime, // ✅ เพิ่ม timestamp
            data: result.recordset
        });

    } catch (error) {
        console.error("Error executing stored procedure:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { upLoadMoldProcess };