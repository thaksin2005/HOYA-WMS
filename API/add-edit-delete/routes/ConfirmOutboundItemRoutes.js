const express = require("express");
const router = express.Router();
const { updateConfirmOutboundItem } = require("../controllers/ConfirmOutboundItemController");

router.put("/confirm-outbounditem", updateConfirmOutboundItem);

module.exports = router;