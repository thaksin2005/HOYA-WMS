// // controllers/factoryController.js
// const { sql, poolPromise } = require("../config/dbConfig");

// const addFactory = async(req, res) => {
//     try {
//         const {
//             F_Code,
//             F_ShortCode,
//             F_Name,
//             F_City,
//             F_Site,
//             F_Address,
//             F_Tel,
//             F_Email,
//             F_TaxID,
//             UA_IDCreateBy,
//             F_CreateOn,
//             F_IsActive,
//             F_Remarks,
//             C_IDCompany,
//         } = req.body;

//         const pool = await poolPromise;
//         const result = await pool
//             .request()
//             .input("F_Code", sql.NVarChar(100), F_Code)
//             .input("F_ShortCode", sql.NVarChar(10), F_ShortCode)
//             .input("F_Name", sql.NVarChar(500), F_Name)
//             .input("F_City", sql.NVarChar(80), F_City)
//             .input("F_Site", sql.NVarChar(4), F_Site)
//             .input("F_Address", sql.NVarChar(sql.MAX), F_Address)
//             .input("F_Tel", sql.NVarChar(100), F_Tel)
//             .input("F_Email", sql.NVarChar(200), F_Email)
//             .input("F_TaxID", sql.NVarChar(15), F_TaxID)
//             .input("UA_IDCreateBy", sql.Int, UA_IDCreateBy)
//             .input("F_CreateOn", sql.DateTime2(7), F_CreateOn)
//             .input("F_IsActive", sql.Bit, F_IsActive)
//             .input("F_Remarks", sql.NVarChar(sql.MAX), F_Remarks)
//             .input("C_IDCompany", sql.Int, C_IDCompany)
//             .query(
//                 "INSERT INTO Factory (F_Code, F_ShortCode, F_Name, F_City, F_Site, F_Address, F_Tel, F_Email, F_TaxID, UA_IDCreateBy, F_CreateOn, F_IsActive, F_Remarks, C_IDCompany) VALUES (@F_Code, @F_ShortCode, @F_Name, @F_City, @F_Site, @F_Address, @F_Tel, @F_Email, @F_TaxID, @UA_IDCreateBy, @F_CreateOn, @F_IsActive, @F_Remarks, @C_IDCompany)"
//             );

//         if (result.rowsAffected[0] > 0) {
//             res.status(200).json({ message: "Factory record inserted successfully" });
//         } else {
//             res.status(400).json({ message: "Failed to insert factory record" });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // แก้ไขข้อมูล Factory
// const editFactory = async(req, res) => {
//     try {
//         const {
//             F_ID,
//             F_Code,
//             F_ShortCode,
//             F_Name,
//             F_City,
//             F_Site,
//             F_Address,
//             F_Tel,
//             F_Email,
//             F_TaxID,
//             UA_IDCreateBy,
//             F_CreateOn,
//             F_IsActive,
//             F_Remarks,
//             C_IDCompany,
//         } = req.body;

//         const pool = await poolPromise;
//         const result = await pool
//             .request()
//             .input("F_ID", sql.Int, F_ID)
//             .input("F_Code", sql.NVarChar(100), F_Code)
//             .input("F_ShortCode", sql.NVarChar(10), F_ShortCode)
//             .input("F_Name", sql.NVarChar(500), F_Name)
//             .input("F_City", sql.NVarChar(80), F_City)
//             .input("F_Site", sql.NVarChar(4), F_Site)
//             .input("F_Address", sql.NVarChar(sql.MAX), F_Address)
//             .input("F_Tel", sql.NVarChar(100), F_Tel)
//             .input("F_Email", sql.NVarChar(200), F_Email)
//             .input("F_TaxID", sql.NVarChar(15), F_TaxID)
//             .input("UA_IDCreateBy", sql.Int, UA_IDCreateBy)
//             .input("F_CreateOn", sql.DateTime2(7), F_CreateOn)
//             .input("F_IsActive", sql.Bit, F_IsActive)
//             .input("F_Remarks", sql.NVarChar(sql.MAX), F_Remarks)
//             .input("C_IDCompany", sql.Int, C_IDCompany)
//             .query(
//                 "UPDATE Factory SET F_Code = @F_Code, F_ShortCode = @F_ShortCode, F_Name = @F_Name, F_City = @F_City, F_Site = @F_Site, F_Address = @F_Address, F_Tel = @F_Tel, F_Email = @F_Email, F_TaxID = @F_TaxID, UA_IDCreateBy = @UA_IDCreateBy, F_CreateOn = @F_CreateOn, F_IsActive = @F_IsActive, F_Remarks = @F_Remarks, C_IDCompany = @C_IDCompany WHERE F_ID = @F_ID"
//             );

//         if (result.rowsAffected[0] > 0) {
//             res.status(200).json({ message: "Factory record updated successfully" });
//         } else {
//             res.status(404).json({ message: "Factory record not found" });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // ลบข้อมูล Factory
// const deleteFactory = async(req, res) => {
//     try {
//         const { F_ID } = req.params;

//         const pool = await poolPromise;
//         const result = await pool
//             .request()
//             .input("F_ID", sql.Int, F_ID)
//             .query("DELETE FROM Factory WHERE F_ID = @F_ID");

//         if (result.rowsAffected[0] > 0) {
//             res.status(200).json({ message: "Factory record deleted successfully" });
//         } else {
//             res.status(404).json({ message: "Factory record not found" });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// const getFactoryById = async(req, res) => {
//     try {
//         const { F_ID } = req.params;

//         const pool = await poolPromise;
//         const result = await pool
//             .request()
//             .input("F_ID", sql.Int, F_ID)
//             .query("SELECT * FROM Factory WHERE F_ID = @F_ID");

//         if (result.recordset.length > 0) {
//             res.status(200).json(result.recordset[0]);
//         } else {
//             res.status(404).json({ message: "Factory record not found" });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// module.exports = {
//     addFactory,
//     editFactory,
//     deleteFactory,
//     getFactoryById, // เพิ่มฟังก์ชันนี้ใน module exports
// };


// const { sql, poolPromise } = require("../config/dbConfig");

// // เพิ่มข้อมูล Factory
// const addFactory = async(req, res) => {
//     try {
//         const {
//             F_Code,
//             F_ShortCode,
//             F_Name,
//             F_City,
//             F_Site,
//             F_Address,
//             F_Tel,
//             F_Email,
//             F_TaxID,
//             UA_IDCreateBy,
//             F_CreateOn,
//             F_IsActive,
//             F_Remarks,
//             C_IDCompany,
//         } = req.body;

//         const pool = await poolPromise;
//         const result = await pool
//             .request()
//             .input("F_Code", sql.NVarChar(100), F_Code)
//             .input("F_ShortCode", sql.NVarChar(10), F_ShortCode)
//             .input("F_Name", sql.NVarChar(500), F_Name)
//             .input("F_City", sql.NVarChar(80), F_City)
//             .input("F_Site", sql.NVarChar(4), F_Site)
//             .input("F_Address", sql.NVarChar(sql.MAX), F_Address)
//             .input("F_Tel", sql.NVarChar(100), F_Tel)
//             .input("F_Email", sql.NVarChar(200), F_Email)
//             .input("F_TaxID", sql.NVarChar(15), F_TaxID)
//             .input("UA_IDCreateBy", sql.Int, UA_IDCreateBy)
//             .input("F_CreateOn", sql.DateTime2(7), F_CreateOn)
//             .input("F_IsActive", sql.Bit, F_IsActive)
//             .input("F_Remarks", sql.NVarChar(sql.MAX), F_Remarks)
//             .input("C_IDCompany", sql.Int, C_IDCompany)
//             .query(
//                 "INSERT INTO Factory (F_Code, F_ShortCode, F_Name, F_City, F_Site, F_Address, F_Tel, F_Email, F_TaxID, UA_IDCreateBy, F_CreateOn, F_IsActive, F_Remarks, C_IDCompany) VALUES (@F_Code, @F_ShortCode, @F_Name, @F_City, @F_Site, @F_Address, @F_Tel, @F_Email, @F_TaxID, @UA_IDCreateBy, @F_CreateOn, @F_IsActive, @F_Remarks, @C_IDCompany)"
//             );

//         if (result.rowsAffected[0] > 0) {
//             res.status(200).json({ message: "Factory record inserted successfully" });
//         } else {
//             res.status(400).json({ message: "Failed to insert factory record" });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // แก้ไขข้อมูล Factory
// const editFactory = async(req, res) => {
//     try {
//         const {
//             F_ID,
//             F_Code,
//             F_ShortCode,
//             F_Name,
//             F_City,
//             F_Site,
//             F_Address,
//             F_Tel,
//             F_Email,
//             F_TaxID,
//             UA_IDCreateBy,
//             // F_CreateOn,
//             F_IsActive,
//             F_Remarks,
//             C_IDCompany,
//         } = req.body;

//         const pool = await poolPromise;
//         const result = await pool
//             .request()
//             .input("F_ID", sql.Int, F_ID)
//             .input("F_Code", sql.NVarChar(100), F_Code)
//             .input("F_ShortCode", sql.NVarChar(10), F_ShortCode)
//             .input("F_Name", sql.NVarChar(500), F_Name)
//             .input("F_City", sql.NVarChar(80), F_City)
//             .input("F_Site", sql.NVarChar(4), F_Site)
//             .input("F_Address", sql.NVarChar(sql.MAX), F_Address)
//             .input("F_Tel", sql.NVarChar(100), F_Tel)
//             .input("F_Email", sql.NVarChar(200), F_Email)
//             .input("F_TaxID", sql.NVarChar(15), F_TaxID)
//             .input("UA_IDCreateBy", sql.Int, UA_IDCreateBy)
//             // .input("F_CreateOn", sql.DateTime2(7), F_CreateOn)
//             .input("F_IsActive", sql.Bit, F_IsActive)
//             .input("F_Remarks", sql.NVarChar(sql.MAX), F_Remarks)
//             .input("C_IDCompany", sql.Int, C_IDCompany)
//             .query(
//                 "UPDATE Factory SET F_Code = @F_Code, F_ShortCode = @F_ShortCode, F_Name = @F_Name, F_City = @F_City, F_Site = @F_Site, F_Address = @F_Address, F_Tel = @F_Tel, F_Email = @F_Email, F_TaxID = @F_TaxID, UA_IDCreateBy = @UA_IDCreateBy, F_IsActive = @F_IsActive, F_Remarks = @F_Remarks, C_IDCompany = @C_IDCompany WHERE F_ID = @F_ID"
//             );

//         if (result.rowsAffected[0] > 0) {
//             res.status(200).json({ message: "Factory record updated successfully" });
//         } else {
//             res.status(404).json({ message: "Factory record not found" });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // ลบข้อมูล Factory
// const deleteFactory = async(req, res) => {
//     try {
//         const { F_ID } = req.params;

//         const pool = await poolPromise;
//         const result = await pool
//             .request()
//             .input("F_ID", sql.Int, F_ID)
//             .query("DELETE FROM Factory WHERE F_ID = @F_ID");

//         if (result.rowsAffected[0] > 0) {
//             res.status(200).json({ message: "Factory record deleted successfully" });
//         } else {
//             res.status(404).json({ message: "Factory record not found" });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // ดึงข้อมูล Factory ตาม F_ID
// const getFactoryById = async(req, res) => {
//     try {
//         const { F_ID } = req.params;

//         const pool = await poolPromise;
//         const result = await pool
//             .request()
//             .input("F_ID", sql.Int, F_ID)
//             .query("SELECT * FROM Factory WHERE F_ID = @F_ID");

//         if (result.recordset.length > 0) {
//             res.status(200).json(result.recordset[0]);
//         } else {
//             res.status(404).json({ message: "Factory record not found" });
//         }
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// module.exports = {
//     addFactory,
//     editFactory,
//     deleteFactory,
//     getFactoryById,
// };


const { sql, poolPromise } = require("../config/dbConfig");

// เพิ่มข้อมูล Factory
const addFactory = async(req, res) => {
    try {
        const {
            F_Code,
            F_ShortCode,
            F_Name,
            F_City,
            F_Site,
            F_Address,
            F_Tel,
            F_Email,
            F_TaxID,
            UA_IDCreateBy,
            // F_CreateOn,
            F_IsActive,
            F_Remarks,
            C_IDCompany,
        } = req.body;

        const pool = await poolPromise;
        const result = await pool
            .request()
            .input("F_Code", sql.NVarChar(100), F_Code)
            .input("F_ShortCode", sql.NVarChar(10), F_ShortCode)
            .input("F_Name", sql.NVarChar(500), F_Name)
            .input("F_City", sql.NVarChar(80), F_City)
            .input("F_Site", sql.NVarChar(4), F_Site)
            .input("F_Address", sql.NVarChar(sql.MAX), F_Address)
            .input("F_Tel", sql.NVarChar(100), F_Tel)
            .input("F_Email", sql.NVarChar(200), F_Email)
            .input("F_TaxID", sql.NVarChar(15), F_TaxID)
            .input("UA_IDCreateBy", sql.Int, UA_IDCreateBy)
            // .input("F_CreateOn", sql.DateTime2(7), F_CreateOn)
            .input("F_IsActive", sql.Bit, F_IsActive)
            .input("F_Remarks", sql.NVarChar(sql.MAX), F_Remarks)
            .input("C_IDCompany", sql.Int, C_IDCompany)
            .query(
                "INSERT INTO Factory (F_Code, F_ShortCode, F_Name, F_City, F_Site, F_Address, F_Tel, F_Email, F_TaxID, UA_IDCreateBy, F_IsActive, F_Remarks, C_IDCompany) " +
                "VALUES (@F_Code, @F_ShortCode, @F_Name, @F_City, @F_Site, @F_Address, @F_Tel, @F_Email, @F_TaxID, @UA_IDCreateBy, @F_IsActive, @F_Remarks, @C_IDCompany)"
            );

        if (result.rowsAffected[0] > 0) {
            res.status(200).json({ message: "Factory record inserted successfully" });
        } else {
            res.status(400).json({ message: "Failed to insert factory record" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// แก้ไขข้อมูล Factory
const editFactory = async(req, res) => {
    try {
        const {
            F_ID,
            F_Code,
            F_ShortCode,
            F_Name,
            F_City,
            F_Site,
            F_Address,
            F_Tel,
            F_Email,
            F_TaxID,
            UA_IDCreateBy,
            // F_CreateOn,
            F_IsActive,
            F_Remarks,
            C_IDCompany,
        } = req.body;

        const pool = await poolPromise;
        const result = await pool
            .request()
            .input("F_ID", sql.Int, F_ID)
            .input("F_Code", sql.NVarChar(100), F_Code)
            .input("F_ShortCode", sql.NVarChar(10), F_ShortCode)
            .input("F_Name", sql.NVarChar(500), F_Name)
            .input("F_City", sql.NVarChar(80), F_City)
            .input("F_Site", sql.NVarChar(4), F_Site)
            .input("F_Address", sql.NVarChar(sql.MAX), F_Address)
            .input("F_Tel", sql.NVarChar(100), F_Tel)
            .input("F_Email", sql.NVarChar(200), F_Email)
            .input("F_TaxID", sql.NVarChar(15), F_TaxID)
            .input("UA_IDCreateBy", sql.Int, UA_IDCreateBy)
            // .input("F_CreateOn", sql.DateTime2(7), F_CreateOn)
            .input("F_IsActive", sql.Bit, F_IsActive)
            .input("F_Remarks", sql.NVarChar(sql.MAX), F_Remarks)
            .input("C_IDCompany", sql.Int, C_IDCompany)
            .query(
                "UPDATE Factory SET F_Code = @F_Code, F_ShortCode = @F_ShortCode, F_Name = @F_Name, F_City = @F_City, F_Site = @F_Site, F_Address = @F_Address, F_Tel = @F_Tel, F_Email = @F_Email, F_TaxID = @F_TaxID, UA_IDCreateBy = @UA_IDCreateBy, F_IsActive = @F_IsActive, F_Remarks = @F_Remarks, C_IDCompany = @C_IDCompany WHERE F_ID = @F_ID"
            );

        if (result.rowsAffected[0] > 0) {
            res.status(200).json({ message: "Factory record updated successfully" });
        } else {
            res.status(404).json({ message: "Factory record not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// ลบข้อมูล Factory
const deleteFactory = async(req, res) => {
    try {
        const { F_ID } = req.params;

        const pool = await poolPromise;
        const result = await pool
            .request()
            .input("F_ID", sql.Int, F_ID)
            .query("DELETE FROM Factory WHERE F_ID = @F_ID");

        if (result.rowsAffected[0] > 0) {
            res.status(200).json({ message: "Factory record deleted successfully" });
        } else {
            res.status(404).json({ message: "Factory record not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ดึงข้อมูล Factory ตาม F_ID
const getFactoryById = async(req, res) => {
    try {
        const { F_ID } = req.params;

        const pool = await poolPromise;
        const result = await pool
            .request()
            .input("F_ID", sql.Int, F_ID)
            .query("SELECT * FROM Factory WHERE F_ID = @F_ID");

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
const getAllFactories = async(req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query("SELECT * FROM Factory");

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
    addFactory,
    editFactory,
    deleteFactory,
    getFactoryById,
    getAllFactories
};