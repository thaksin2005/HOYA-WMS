const { sql } = require("../config/dbConfig");
const moment = require("moment"); // ✅ เพิ่ม moment.js

exports.controlMoldBlock = async(req, res) => {
    const { MoldSerial, BlockStatus, DefectID, DefectPrcsID, MachineID } = req.body;

    try {
        const pool = await sql.connect();
        const result = await pool.request()
            .input('MoldSerial', sql.NVarChar(31), MoldSerial)
            .input('BlockStatus', sql.Int, BlockStatus)
            .input('DefectID', sql.Int, DefectID)
            .input('DefectPrcsID', sql.NVarChar(5), DefectPrcsID)
            .input('MachineID', sql.Int, MachineID)
            .execute('WH_ControlMoldBlock');

        // ✅ เพิ่ม timestamp วันเวลาปัจจุบัน
        const currentDateTime = moment().format("YYYY-MM-DD HH:mm:ss");

        res.json({
            message: "Success",
            timestamp: currentDateTime, // ✅ เพิ่ม timestamp
            data: result.recordset
        });

    } catch (err) {
        res.status(500).json({
            message: "Error",
            error: err.message,
        });
    }
};