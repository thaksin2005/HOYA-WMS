const { sql, poolPromise } = require("../config/dbConfig");

const updateConfirmInbound = async(req, res) => {
    try {
        const { IR_ID, IR_Status } = req.body;

        if (!IR_ID || !IR_Status) {
            return res.status(400).json({ error: "IR_ID and IR_Status are required" });
        }

        const pool = await poolPromise;
        const result = await pool
            .request()
            .input("IR_ID", sql.Int, IR_ID)
            .input("IR_Status", sql.VarChar, IR_Status)
            .query(`
        UPDATE WH_InboundRequest
        SET IR_Status = @IR_Status
        WHERE IR_ID = @IR_ID
      `);

        if (result.rowsAffected[0] > 0) {
            res.json({ message: "Updated successfully" });
        } else {
            res.status(404).json({ error: "Record not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { updateConfirmInbound };