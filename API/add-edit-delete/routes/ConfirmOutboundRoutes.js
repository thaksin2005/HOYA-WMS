const express = require("express");
const router = express.Router();
const { updateORStatus } = require("../controllers/ConfirmOutboundController");

router.put("/confirm-outbound", updateORStatus);

module.exports = router;