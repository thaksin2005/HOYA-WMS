const { sql, poolPromise } = require("../config/dbConfig");

// GET all records
const getMoldSerials = async(req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query("SELECT * FROM MoldSerial");
        res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// GET by ID
const getMoldSerialById = async(req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool
            .request()
            .input("MS_ID", sql.Int, req.params.id)
            .query("SELECT * FROM MoldSerial WHERE MS_ID = @MS_ID");
        res.json(result.recordset[0] || {});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// CREATE new record (POST)
const createMoldSerial = async(req, res) => {
    try {
        const {
            MS_Serial,
            MM_IDMoldMaster,
            PW_IDProductionWorkflow,
            MS_ProductionOn,
            MS_Lot,
            MS_Status,
            MP_IDMoldProgram,
            MS_CycleCount,
            MS_ReturnOn,
            MS_IsHold,
            UA_IDCreateBy,
            MS_CreateOn,
            UA_UpdateBy,
            MS_UpdateOn
        } = req.body;

        const pool = await poolPromise;
        await pool
            .request()
            .input("MS_Serial", sql.VarChar, MS_Serial)
            .input("MM_IDMoldMaster", sql.Int, MM_IDMoldMaster)
            .input("PW_IDProductionWorkflow", sql.Int, PW_IDProductionWorkflow)
            .input("MS_ProductionOn", sql.DateTime, MS_ProductionOn)
            .input("MS_Lot", sql.VarChar, MS_Lot)
            .input("MS_Status", sql.VarChar, MS_Status)
            .input("MP_IDMoldProgram", sql.Int, MP_IDMoldProgram)
            .input("MS_CycleCount", sql.Int, MS_CycleCount)
            .input("MS_ReturnOn", sql.DateTime, MS_ReturnOn)
            .input("MS_IsHold", sql.Bit, MS_IsHold)
            .input("UA_IDCreateBy", sql.Int, UA_IDCreateBy)
            .input("MS_CreateOn", sql.DateTime, MS_CreateOn)
            .input("UA_UpdateBy", sql.Int, UA_UpdateBy)
            .input("MS_UpdateOn", sql.DateTime, MS_UpdateOn)
            .query(`
        INSERT INTO MoldSerial 
        (MS_Serial, MM_IDMoldMaster, PW_IDProductionWorkflow, MS_ProductionOn, MS_Lot, MS_Status, 
         MP_IDMoldProgram, MS_CycleCount, MS_ReturnOn, MS_IsHold, UA_IDCreateBy, MS_CreateOn, UA_UpdateBy, MS_UpdateOn) 
        VALUES 
        (@MS_Serial, @MM_IDMoldMaster, @PW_IDProductionWorkflow, @MS_ProductionOn, @MS_Lot, @MS_Status, 
         @MP_IDMoldProgram, @MS_CycleCount, @MS_ReturnOn, @MS_IsHold, @UA_IDCreateBy, @MS_CreateOn, @UA_UpdateBy, @MS_UpdateOn)
      `);

        res.status(201).json({ message: "Mold Serial created successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// UPDATE record (PUT)
const updateMoldSerial = async(req, res) => {
    try {
        const {
            MS_Serial,
            MM_IDMoldMaster,
            PW_IDProductionWorkflow,
            MS_ProductionOn,
            MS_Lot,
            MS_Status,
            MP_IDMoldProgram,
            MS_CycleCount,
            MS_ReturnOn,
            MS_IsHold,
            UA_IDCreateBy,
            MS_CreateOn,
            UA_UpdateBy,
            MS_UpdateOn
        } = req.body;

        const pool = await poolPromise;
        await pool
            .request()
            .input("MS_ID", sql.Int, req.params.id)
            .input("MS_Serial", sql.VarChar, MS_Serial)
            .input("MM_IDMoldMaster", sql.Int, MM_IDMoldMaster)
            .input("PW_IDProductionWorkflow", sql.Int, PW_IDProductionWorkflow)
            .input("MS_ProductionOn", sql.DateTime, MS_ProductionOn)
            .input("MS_Lot", sql.VarChar, MS_Lot)
            .input("MS_Status", sql.VarChar, MS_Status)
            .input("MP_IDMoldProgram", sql.Int, MP_IDMoldProgram)
            .input("MS_CycleCount", sql.Int, MS_CycleCount)
            .input("MS_ReturnOn", sql.DateTime, MS_ReturnOn)
            .input("MS_IsHold", sql.Bit, MS_IsHold)
            .input("UA_IDCreateBy", sql.Int, UA_IDCreateBy)
            .input("MS_CreateOn", sql.DateTime, MS_CreateOn)
            .input("UA_UpdateBy", sql.Int, UA_UpdateBy)
            .input("MS_UpdateOn", sql.DateTime, MS_UpdateOn)
            .query(`
        UPDATE MoldSerial SET 
          MS_Serial = @MS_Serial, 
          MM_IDMoldMaster = @MM_IDMoldMaster, 
          PW_IDProductionWorkflow = @PW_IDProductionWorkflow, 
          MS_ProductionOn = @MS_ProductionOn, 
          MS_Lot = @MS_Lot, 
          MS_Status = @MS_Status, 
          MP_IDMoldProgram = @MP_IDMoldProgram, 
          MS_CycleCount = @MS_CycleCount, 
          MS_ReturnOn = @MS_ReturnOn, 
          MS_IsHold = @MS_IsHold, 
          UA_IDCreateBy = @UA_IDCreateBy, 
          MS_CreateOn = @MS_CreateOn, 
          UA_UpdateBy = @UA_UpdateBy, 
          MS_UpdateOn = @MS_UpdateOn 
        WHERE MS_ID = @MS_ID
      `);

        res.json({ message: "Mold Serial updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// DELETE record
const deleteMoldSerial = async(req, res) => {
    try {
        const pool = await poolPromise;
        await pool
            .request()
            .input("MS_ID", sql.Int, req.params.id)
            .query("DELETE FROM MoldSerial WHERE MS_ID = @MS_ID");
        res.json({ message: "Mold Serial deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getMoldSerials, getMoldSerialById, createMoldSerial, updateMoldSerial, deleteMoldSerial };