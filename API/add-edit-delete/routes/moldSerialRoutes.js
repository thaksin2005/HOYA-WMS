const express = require("express");
const {
    getMoldSerials,
    getMoldSerialById,
    createMoldSerial,
    updateMoldSerial,
    deleteMoldSerial
} = require("../controllers/moldSerialController");

const router = express.Router();

router.get("/getAllMoldSerial", getMoldSerials);
router.get("/getMoldSerial/:id", getMoldSerialById);
router.post("/addMoldSerial", createMoldSerial);
router.put("/editMoldSerial/:id", updateMoldSerial);
router.delete("/deleteMoldSerial/:id", deleteMoldSerial);

module.exports = router;