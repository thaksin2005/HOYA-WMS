// controllers/factoryController.js
const { sql, poolPromise } = require("../config/dbConfig");


const addUserAccount = async(req, res) => {
    try {
        const {
            // UA_ID,
            UA_Code,
            UA_Fullname,
            UA_NickName,
            UA_Email,
            UA_IsActive,
            UA_Remarks,
            UA_PhotoPath,
            UA_MobileNumber,
            UA_Birthdate,
            UA_Username,
            UA_Password,
            UA_LogOn,
            UA_IDCreateBy,
            UA_CreateOn,
            UA_IDUpdateBy,
            UA_UpdateOn,
            UA_SignInLastTime,
            UA_CountSignIn
        } = req.body;

        const pool = await poolPromise;
        const result = await pool
            .request()
            .input("UA_Code", sql.NVarChar(50), UA_Code)
            .input("UA_Fullname", sql.NVarChar(500), UA_Fullname)
            .input("UA_NickName", sql.NVarChar(100), UA_NickName)
            .input("UA_Email", sql.NVarChar(500), UA_Email)
            .input("UA_IsActive", sql.Bit, UA_IsActive)
            .input("UA_Remarks", sql.NVarChar(2000), UA_Remarks)
            .input("UA_PhotoPath", sql.NVarChar(1500), UA_PhotoPath)
            .input("UA_MobileNumber", sql.NVarChar(20), UA_MobileNumber)
            .input("UA_Birthdate", sql.DateTime(7), UA_Birthdate)
            .input("UA_Username", sql.NVarChar(100), UA_Username)
            .input("UA_Password", sql.NVarChar(100), UA_Password)
            .input("UA_LogOn", sql.DateTime(7), UA_LogOn)
            .input("UA_IDCreateBy", sql.Int, UA_IDCreateBy)
            .input("UA_CreateOn", sql.DateTime(7), UA_CreateOn)
            .input("UA_IDUpdateBy", sql.Int, UA_IDUpdateBy)
            .input("UA_UpdateOn", sql.DateTime(7), UA_UpdateOn)
            .input("UA_SignInLastTime", sql.DateTime(7), UA_SignInLastTime)
            .input("UA_CountSignIn", sql.Int, UA_CountSignIn)
            .query(
                "INSERT INTO UserAccount (UA_Code, UA_Fullname,UA_NickName,UA_Email,UA_IsActive,UA_Remarks,UA_PhotoPath,UA_MobileNumber,UA_Birthdate,UA_Username,UA_Password,UA_LogOn,UA_IDCreateBy,UA_CreateOn,UA_IDUpdateBy,UA_UpdateOn,UA_SignInLastTime,UA_CountSignIn) VALUES (@UA_Code, @UA_Fullname, @UA_NickName, @UA_Email, @UA_IsActive, @UA_Remarks, @UA_PhotoPath, @UA_MobileNumber, @UA_Birthdate, @UA_Username, @UA_Password, @UA_LogOn, @UA_IDCreateBy, @UA_CreateOn, @UA_IDUpdateBy, @UA_UpdateOn, @UA_SignInLastTime, @UA_CountSignIn)"
            );

        res.status(201).json({ message: "Record inserted successfully", data: result.recordset });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// แก้ไขข้อมูล Factory
const editUserAccount = async(req, res) => {
    try {
        const {
            UA_ID,
            UA_Code,
            UA_Fullname,
            UA_NickName,
            UA_Email,
            UA_IsActive,
            UA_Remarks,
            UA_PhotoPath,
            UA_MobileNumber,
            UA_Birthdate,
            UA_Username,
            UA_Password,
            UA_LogOn,
            UA_IDCreateBy,
            UA_CreateOn,
            UA_IDUpdateBy,
            UA_UpdateOn,
            UA_SignInLastTime,
            UA_CountSignIn
        } = req.body;

        const pool = await poolPromise;
        const result = await pool
            .request()
            .input("UA_ID", sql.Int, UA_ID)
            .input("UA_Code", sql.NVarChar(50), UA_Code)
            .input("UA_Fullname", sql.NVarChar(500), UA_Fullname)
            .input("UA_NickName", sql.NVarChar(100), UA_NickName)
            .input("UA_Email", sql.NVarChar(500), UA_Email)
            .input("UA_IsActive", sql.Bit, UA_IsActive)
            .input("UA_Remarks", sql.NVarChar(2000), UA_Remarks)
            .input("UA_PhotoPath", sql.NVarChar(1500), UA_PhotoPath)
            .input("UA_MobileNumber", sql.NVarChar(20), UA_MobileNumber)
            .input("UA_Birthdate", sql.DateTime(7), UA_Birthdate)
            .input("UA_Username", sql.NVarChar(100), UA_Username)
            .input("UA_Password", sql.NVarChar(100), UA_Password)
            .input("UA_LogOn", sql.DateTime(7), UA_LogOn)
            .input("UA_IDCreateBy", sql.Int, UA_IDCreateBy)
            .input("UA_CreateOn", sql.DateTime(7), UA_CreateOn)
            .input("UA_IDUpdateBy", sql.Int, UA_IDUpdateBy)
            .input("UA_UpdateOn", sql.DateTime(7), UA_UpdateOn)
            .input("UA_SignInLastTime", sql.DateTime(7), UA_SignInLastTime)
            .input("UA_CountSignIn", sql.Int, UA_CountSignIn)
            .query(
                "UPDATE UserAccount SET UA_ID = @UA_ID, UA_Code = @UA_Code, UA_Fullname = @UA_Fullname ,UA_NickName = @UA_NickName ,UA_Email = @UA_Email ,UA_IsActive = @UA_IsActive ,UA_Remarks = @UA_Remarks ,UA_PhotoPath = @UA_PhotoPath ,UA_MobileNumber = @UA_MobileNumber ,UA_Birthdate = @UA_Birthdate, UA_Username = @UA_Username ,UA_Password = @UA_Password ,UA_LogOn = @UA_LogOn ,UA_IDCreateBy = @UA_IDCreateBy ,UA_CreateOn = @UA_CreateOn ,UA_IDUpdateBy = @UA_IDUpdateBy ,UA_UpdateOn = @UA_UpdateOn ,UA_SignInLastTime = @UA_SignInLastTime ,UA_CountSignIn = @UA_CountSignIn"
            );

        res.status(200).json({ message: "Record updated successfully", data: result.recordset });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ลบข้อมูล Factory
const deleteUserAccount = async(req, res) => {
    try {
        const { F_ID } = req.params;

        const pool = await poolPromise;
        const result = await pool
            .request()
            .input("UA_ID", sql.Int, F_ID)
            .query("DELETE FROM UserAccount WHERE UA_ID = @UA_ID");

        if (result.rowsAffected[0] > 0) {
            res.status(200).json({ message: "UserAccount record deleted successfully" });
        } else {
            res.status(404).json({ message: "UserAccount record not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    addUserAccount,
    editUserAccount,
    deleteUserAccount,
};