// controllers/warehouseController.js
const { sql, poolPromise } = require("../config/dbConfig");


const addWarehouse = async(req, res) => {
    try {
        const {
            W_Code,
            W_Name,
            F_IDFactory,
            UA_IDCreateBy,
            W_CreateOn,
            W_IsActive,
            W_Remarks,
        } = req.body;

        const pool = await poolPromise;
        const result = await pool
            .request()
            .input("W_Code", sql.NVarChar(100), W_Code)
            .input("W_Name", sql.NVarChar(500), W_Name)
            .input("F_IDFactory", sql.Int, F_IDFactory)
            .input("UA_IDCreateBy", sql.Int, UA_IDCreateBy)
            .input("W_CreateOn", sql.DateTime2(7), W_CreateOn)
            .input("W_IsActive", sql.Bit, W_IsActive)
            .input("W_Remarks", sql.NVarChar(sql.MAX), W_Remarks)
            .query(
                "INSERT INTO Warehouse (W_Code, W_Name, F_IDFactory, UA_IDCreateBy, W_CreateOn, W_IsActive, W_Remarks) OUTPUT INSERTED.W_ID VALUES (@W_Code, @W_Name, @F_IDFactory, @UA_IDCreateBy, @W_CreateOn, @W_IsActive, @W_Remarks)"
            );

            console.log(W_CreateOn);

        if (result.recordset.length > 0) {
            res.status(200).json({
                message: "Warehouse record inserted successfully",
                W_ID: result.recordset[0].W_ID
            });
        } else {
            res.status(400).json({ message: "Failed to insert warehouse record" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



const editWarehouse = async(req, res) => {
    try {
        const {
            W_ID,
            W_Code,
            W_Name,
            F_IDFactory,
            UA_IDCreateBy,
            W_CreateOn,
            W_IsActive,
            W_Remarks,
        } = req.body;

        const pool = await poolPromise;
        const result = await pool
            .request()
            .input("W_ID", sql.Int, W_ID)
            .input("W_Code", sql.NVarChar(100), W_Code)
            .input("W_Name", sql.NVarChar(500), W_Name)
            .input("F_IDFactory", sql.Int, F_IDFactory)
            .input("UA_IDCreateBy", sql.Int, UA_IDCreateBy)
            .input("W_CreateOn", sql.DateTime2(7), W_CreateOn)
            .input("W_IsActive", sql.Bit, W_IsActive)
            .input("W_Remarks", sql.NVarChar(sql.MAX), W_Remarks)
            .query(
                "UPDATE Warehouse SET W_Code = @W_Code, W_Name = @W_Name, F_IDFactory = @F_IDFactory, UA_IDCreateBy = @UA_IDCreateBy, W_CreateOn = @W_CreateOn, W_IsActive = @W_IsActive, W_Remarks = @W_Remarks WHERE W_ID = @W_ID"
            );

        if (result.rowsAffected[0] > 0) {
            res.status(200).json({ message: "Warehouse record updated successfully" });
        } else {
            res.status(404).json({ message: "Warehouse record not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const deleteWarehouse = async(req, res) => {
    try {
        const { W_ID } = req.params;

        const pool = await poolPromise;
        const result = await pool
            .request()
            .input("W_ID", sql.Int, W_ID)
            .query("DELETE FROM Warehouse WHERE W_ID = @W_ID");

        if (result.rowsAffected[0] > 0) {
            res.status(200).json({ message: "Warehouse record deleted successfully" });
        } else {
            res.status(404).json({ message: "Warehouse record not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const getWarehouseById = async(req, res) => {
    try {
        const { W_ID } = req.params;

        const pool = await poolPromise;
        const result = await pool
            .request()
            .input("W_ID", sql.Int, W_ID)
            .query("SELECT * FROM Warehouse WHERE W_ID = @W_ID");

        if (result.recordset.length > 0) {
            res.status(200).json(result.recordset[0]);
        } else {
            res.status(404).json({ message: "Warehouse record not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllWarehouse = async(req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query("SELECT * FROM Warehouse ");

        if (result.recordset.length > 0) {
            res.status(200).json(result.recordset);
        } else {
            res.status(404).json({ message: "No factory records found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    addWarehouse,
    editWarehouse,
    deleteWarehouse,
    getWarehouseById,
    getAllWarehouse
};