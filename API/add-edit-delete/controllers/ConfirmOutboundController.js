const { sql, poolPromise } = require("../config/dbConfig");

const updateORStatus = async(req, res) => {
    try {
        const { OR_ID, OR_Status } = req.body;

        if (!OR_ID || !OR_Status) {
            return res.status(400).json({ error: "OR_ID and OR_Status are required" });
        }

        const pool = await poolPromise;
        const result = await pool
            .request()
            .input("OR_ID", sql.Int, OR_ID)
            .input("OR_Status", sql.VarChar, OR_Status)
            .query(`
        UPDATE WH_OutboundRequest
        SET OR_Status = @OR_Status
        WHERE OR_ID = @OR_ID
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

module.exports = { updateORStatus };