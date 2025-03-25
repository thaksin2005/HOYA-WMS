const { sql, poolPromise } = require("../config/dbConfig");

const updateLocationActive = async(req, res) => {
    try {
        const { L_ID, L_IsActive } = req.body;

        if (!L_ID || !L_IsActive) {
            return res.status(400).json({ error: "L_ID and L_IsActive are required" });
        }

        const pool = await poolPromise;
        const result = await pool
            .request()
            .input("L_ID", sql.Int, L_ID)
            .input("L_IsActive", sql.VarChar, L_IsActive)
            .query(`
        UPDATE WH_Location
        SET L_IsActive = @L_IsActive
        WHERE L_ID = @L_ID
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

module.exports = { updateLocationActive };