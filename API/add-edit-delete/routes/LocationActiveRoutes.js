const express = require("express");
const router = express.Router();
const { updateLocationActive } = require("../controllers/LocationActiveController");

router.put("/Location-Active", updateLocationActive);

module.exports = router;