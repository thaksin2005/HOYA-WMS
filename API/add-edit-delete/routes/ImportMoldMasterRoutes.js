const express = require("express");
const router = express.Router();
const upload = require("../config/uploadMoldMasterConfig");
const importMoldMasterController = require("../controllers/ImportMoldMasterController");

// ตั้ง API route สำหรับการอัปโหลดไฟล์ CSV
router.post("/moldMaster-import-csv", upload.single("file"), importMoldMasterController.importCSV);

module.exports = router;