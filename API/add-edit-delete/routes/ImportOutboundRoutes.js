const express = require("express");
const router = express.Router();
const upload = require("../config/uploadOutboundConfig");
const importOutboundController = require("../controllers/ImportOutboundController");

router.post("/outbound-import-csv", upload.single("file"), importOutboundController.importCSV);

module.exports = router;