const express = require("express");
const router = express.Router();
const { resetMoldTask } = require("../controllers/ExpressController");

router.post("/reset-mold-task", resetMoldTask);

module.exports = router;