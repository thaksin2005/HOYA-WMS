const express = require("express");
const router = express.Router();
const { updateConfirmInbound } = require("../controllers/ConfirmInboundController");

router.put("/confirm-inbound", updateConfirmInbound);

module.exports = router;