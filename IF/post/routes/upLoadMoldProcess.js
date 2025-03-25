const express = require("express");
const router = express.Router();
const { upLoadMoldProcess } = require("../controllers/upLoadMoldProcessController");

router.post("/", upLoadMoldProcess);

module.exports = router;