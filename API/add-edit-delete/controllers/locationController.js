const { sql, poolPromise } = require("../config/dbConfig");

// เพิ่มข้อมูล Location
const addLocation = async(req, res) => {
    try {
        const {
            L_Code,
            L_Description,
            P_IDPlace,
            L_VZone,
            L_HZone,
            L_IsActive,
            L_IsBlock,
            L_IsReserve,
            S_IDStacker,
            T_IDTray,
            UA_IDCreateBy,
            L_CreateOn,
            UA_IDUpdateBy,
            L_UpdateOn,
            L_Remarks,
            // Warehouse,
            // Stacker,
            // Row,
            // Col,
            // Lvl,
        } = req.body;

        const pool = await poolPromise;
        const result = await pool
            .request()
            .input("L_Code", sql.NVarChar, L_Code)
            .input("L_Description", sql.NVarChar, L_Description)
            .input("P_IDPlace", sql.Int, P_IDPlace)
            .input("L_VZone", sql.NVarChar, L_VZone)
            .input("L_HZone", sql.NVarChar, L_HZone)
            .input("L_IsActive", sql.Bit, L_IsActive)
            .input("L_IsBlock", sql.Bit, L_IsBlock)
            .input("L_IsReserve", sql.Bit, L_IsReserve)
            .input("S_IDStacker", sql.Int, S_IDStacker)
            .input("T_IDTray", sql.Int, T_IDTray)
            .input("UA_IDCreateBy", sql.Int, UA_IDCreateBy)
            .input("L_CreateOn", sql.DateTime, L_CreateOn)
            .input("UA_IDUpdateBy", sql.Int, UA_IDUpdateBy)
            .input("L_UpdateOn", sql.DateTime, L_UpdateOn)
            .input("L_Remarks", sql.NVarChar, L_Remarks)
            // .input("Warehouse", sql.NVarChar, Warehouse)
            // .input("Stacker", sql.NVarChar, Stacker)
            // .input("Row", sql.Int, Row)
            // .input("Col", sql.Int, Col)
            // .input("Lvl", sql.Int, Lvl) // ตรวจสอบว่า 'Lvl' ไม่ใช่ computed column                 , Warehouse, Stacker, Row, Col, Lvl                       , @Warehouse, @Stacker, @Row, @Col, @Lvl
            .query(
                "INSERT INTO WH_Location (L_Code, L_Description, P_IDPlace, L_VZone, L_HZone, L_IsActive, L_IsBlock, L_IsReserve, S_IDStacker, T_IDTray, UA_IDCreateBy, L_CreateOn, UA_IDUpdateBy, L_UpdateOn, L_Remarks) VALUES (@L_Code, @L_Description, @P_IDPlace, @L_VZone, @L_HZone, @L_IsActive, @L_IsBlock, @L_IsReserve, @S_IDStacker, @T_IDTray, @UA_IDCreateBy, @L_CreateOn, @UA_IDUpdateBy, @L_UpdateOn, @L_Remarks)"
            );

        res.status(201).json({ message: "Location record inserted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// แก้ไขข้อมูล Location
const editLocation = async(req, res) => {
    try {
        const {
            L_Code,
            L_Description,
            P_IDPlace,
            L_VZone,
            L_HZone,
            L_IsActive,
            L_IsBlock,
            L_IsReserve,
            S_IDStacker,
            T_IDTray,
            UA_IDCreateBy,
            L_CreateOn,
            UA_IDUpdateBy,
            L_UpdateOn,
            L_Remarks,
            // Warehouse,
            // Stacker,
            // Row,
            // Col,
            // Lvl,
        } = req.body;

        const { L_ID } = req.params; // ใช้ L_ID จาก req.params

        const pool = await poolPromise;
        const result = await pool
            .request()
            .input("L_ID", sql.BigInt, L_ID)
            .input("L_Code", sql.NVarChar, L_Code)
            .input("L_Description", sql.NVarChar, L_Description)
            .input("P_IDPlace", sql.Int, P_IDPlace)
            .input("L_VZone", sql.NVarChar, L_VZone)
            .input("L_HZone", sql.NVarChar, L_HZone)
            .input("L_IsActive", sql.Bit, L_IsActive)
            .input("L_IsBlock", sql.Bit, L_IsBlock)
            .input("L_IsReserve", sql.Bit, L_IsReserve)
            .input("S_IDStacker", sql.Int, S_IDStacker)
            .input("T_IDTray", sql.Int, T_IDTray)
            .input("UA_IDCreateBy", sql.Int, UA_IDCreateBy)
            .input("L_CreateOn", sql.DateTime, L_CreateOn)
            .input("UA_IDUpdateBy", sql.Int, UA_IDUpdateBy)
            .input("L_UpdateOn", sql.DateTime, L_UpdateOn)
            .input("L_Remarks", sql.NVarChar, L_Remarks)
            // .input("Warehouse", sql.NVarChar, Warehouse)
            // .input("Stacker", sql.NVarChar, Stacker)
            // .input("Row", sql.Int, Row)
            // .input("Col", sql.Int, Col)
            // .input("Lvl", sql.Int, Lvl) // ตรวจสอบว่า 'Lvl' ไม่ใช่ computed column
            .query(
                "UPDATE WH_Location SET L_Code = @L_Code, L_Description = @L_Description, P_IDPlace = @P_IDPlace, L_VZone = @L_VZone, L_HZone = @L_HZone, L_IsActive = @L_IsActive, L_IsBlock = @L_IsBlock, L_IsReserve = @L_IsReserve, S_IDStacker = @S_IDStacker, T_IDTray = @T_IDTray, UA_IDCreateBy = @UA_IDCreateBy, L_CreateOn = @L_CreateOn, UA_IDUpdateBy = @UA_IDUpdateBy, L_UpdateOn = @L_UpdateOn, L_Remarks = @L_Remarks WHERE L_ID = @L_ID" //Warehouse = @Warehouse, Stacker = @Stacker, Row = @Row, Col = @Col
            );

        res.status(200).json({ message: "Location record updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ลบข้อมูล Location
const deleteLocation = async(req, res) => {
    try {
        const { L_ID } = req.params;

        const pool = await poolPromise;
        const result = await pool
            .request()
            .input("L_ID", sql.BigInt, L_ID)
            .query("DELETE FROM WH_Location WHERE L_ID = @L_ID");

        if (result.rowsAffected[0] > 0) {
            res.status(200).json({ message: "Location record deleted successfully" });
        } else {
            res.status(404).json({ message: "Location record not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const getLocationById = async(req, res) => {
    try {
        const { L_ID } = req.params;

        const pool = await poolPromise;
        const result = await pool
            .request()
            .input("L_ID", sql.Int, L_ID)
            .query("SELECT * FROM WH_Location WHERE L_ID = @L_ID");

        if (result.recordset.length > 0) {
            res.status(200).json(result.recordset[0]);
        } else {
            res.status(404).json({ message: "Location record not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const getAllLocation = async(req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query("SELECT * FROM WH_Location");

        if (result.recordset.length > 0) {
            res.status(200).json(result.recordset);
        } else {
            res.status(404).json({ message: "No Location records found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    addLocation,
    editLocation,
    deleteLocation,
    getLocationById,
    getAllLocation

};