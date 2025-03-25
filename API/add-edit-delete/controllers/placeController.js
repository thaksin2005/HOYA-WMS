// controllers/placeController.js
const { sql, poolPromise } = require("../config/dbConfig");

// เพิ่มข้อมูลใหม่
const addPlace = async(req, res) => {
    try {
        const { P_Code, P_Name, W_IDWarehouse, P_IsAutoStorage, P_IsActive, UA_IDCreateBy, P_Remarks } = req.body;

        const pool = await poolPromise; // เชื่อมต่อกับฐานข้อมูล
        const result = await pool
            .request()
            .input("P_Code", sql.NVarChar, P_Code)
            .input("P_Name", sql.NVarChar, P_Name)
            .input("W_IDWarehouse", sql.Int, W_IDWarehouse)
            .input("P_IsAutoStorage", sql.Bit, P_IsAutoStorage)
            .input("P_IsActive", sql.Bit, P_IsActive)
            .input("UA_IDCreateBy", sql.Int, UA_IDCreateBy)
            // .input("P_CreateOn", sql.DateTime, P_CreateOn)
            .input("P_Remarks", sql.NVarChar, P_Remarks)
            .query(
                "INSERT INTO Place (P_Code, P_Name, W_IDWarehouse, P_IsAutoStorage, P_IsActive, UA_IDCreateBy, P_Remarks) VALUES (@P_Code, @P_Name, @W_IDWarehouse, @P_IsAutoStorage, @P_IsActive, @UA_IDCreateBy, @P_Remarks)"
            );

        res.status(200).json({ message: "Record inserted successfully", data: result.recordset });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// แก้ไขข้อมูล Place
const editPlace = async(req, res) => {
    try {
        const { P_ID, P_Code, P_Name, W_IDWarehouse, P_IsAutoStorage, P_IsActive, UA_IDCreateBy, P_Remarks } = req.body;

        const pool = await poolPromise;
        const result = await pool
            .request()
            .input("P_ID", sql.Int, P_ID)
            .input("P_Code", sql.NVarChar, P_Code)
            .input("P_Name", sql.NVarChar, P_Name)
            .input("W_IDWarehouse", sql.Int, W_IDWarehouse)
            .input("P_IsAutoStorage", sql.Bit, P_IsAutoStorage)
            .input("P_IsActive", sql.Bit, P_IsActive)
            .input("UA_IDCreateBy", sql.Int, UA_IDCreateBy)
            // .input("P_CreateOn", sql.DateTime, P_CreateOn)
            .input("P_Remarks", sql.NVarChar, P_Remarks)
            .query(
                "UPDATE Place SET P_Code = @P_Code, P_Name = @P_Name, W_IDWarehouse = @W_IDWarehouse, P_IsAutoStorage = @P_IsAutoStorage, P_IsActive = @P_IsActive, UA_IDCreateBy = @UA_IDCreateBy,  P_Remarks = @P_Remarks WHERE P_ID = @P_ID"
            );

        res.status(200).json({ message: "Record updated successfully", data: result.recordset });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ลบข้อมูล Place
const deletePlace = async(req, res) => {
    try {
        const { P_ID } = req.params;

        const pool = await poolPromise;
        const result = await pool
            .request()
            .input("P_ID", sql.Int, P_ID)
            .query("DELETE FROM Place WHERE P_ID = @P_ID");

        if (result.rowsAffected[0] > 0) {
            res.status(200).json({ message: "Record deleted successfully" });
        } else {
            res.status(404).json({ message: "Record not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// ดึงข้อมูล Place ตาม F_ID
const getPlaceById = async(req, res) => {
    try {
        const { P_ID } = req.params;

        const pool = await poolPromise;
        const result = await pool
            .request()
            .input("P_ID", sql.Int, P_ID)
            .query("SELECT * FROM Place WHERE P_ID = @P_ID");

        if (result.recordset.length > 0) {
            res.status(200).json(result.recordset[0]);
        } else {
            res.status(404).json({ message: "Factory record not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ดึงข้อมูล Factory ทั้งหมด
const getAllPlace = async(req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query("SELECT * FROM Place");

        if (result.recordset.length > 0) {
            res.status(200).json(result.recordset);
        } else {
            res.status(404).json({ message: "No Place records found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    addPlace,
    editPlace,
    deletePlace,
    getPlaceById,
    getAllPlace

};