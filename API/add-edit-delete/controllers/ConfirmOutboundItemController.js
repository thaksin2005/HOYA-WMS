const { sql, poolPromise } = require("../config/dbConfig");

const updateConfirmOutboundItem = async(req, res) => {
    try {
        const { ORI_ID, ORI_Status } = req.body;

        if (!ORI_ID || !ORI_Status) {
            return res.status(400).json({ error: "ORI_ID and ORI_Status are required" });
        }

        const pool = await poolPromise;
        const result = await pool
            .request()
            .input("ORI_ID", sql.Int, ORI_ID)
            .input("ORI_Status", sql.VarChar, ORI_Status)
            .query(`
        UPDATE WH_OutboundRequestItem
        SET ORI_Status = @ORI_Status
        WHERE ORI_ID = @ORI_ID
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

module.exports = { updateConfirmOutboundItem };