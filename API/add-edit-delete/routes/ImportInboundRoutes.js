const express = require("express");
const router = express.Router();
const upload = require("../config/uploadInboundConfig");
const importInboundController = require("../controllers/ImportInboundController");

// ตั้ง API route สำหรับการอัปโหลดไฟล์ CSV
router.post("/inbound-import-csv", upload.single("file"), importInboundController.importCSV);

module.exports = router;