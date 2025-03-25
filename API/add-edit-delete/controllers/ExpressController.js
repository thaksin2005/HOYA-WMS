const { sql, poolPromise } = require("../config/dbConfig");

const resetMoldTask = async(req, res) => {
    try {
        const { UA_ID, IRI_ID, MoldSerial } = req.body;

        if (!UA_ID || !IRI_ID || !MoldSerial) {
            return res.status(400).json({ error: "Missing required parameters" });
        }

        const pool = await poolPromise;
        const result = await pool
            .request()
            .input("UA_ID", sql.Int, UA_ID)
            .input("IRI_ID", sql.Int, IRI_ID)
            .input("MoldSerial", sql.VarChar, MoldSerial)
            .execute("SYSASRS_ResetTaskInitialMoldInbound");

        res.status(200).json({ message: "Stored procedure executed successfully", data: result.recordset });
    } catch (err) {
        console.error("Executing stored procedure:", err);
        res.status(200).json({ error: "Error executing stored procedure", details: err.message });
    }
};

module.exports = { resetMoldTask };