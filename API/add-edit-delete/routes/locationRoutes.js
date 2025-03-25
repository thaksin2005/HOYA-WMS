const express = require("express");
const router = express.Router();
const { addLocation, editLocation, deleteLocation, getLocationById, getAllLocation } = require("../controllers/locationController");

router.get("/getLocation/:L_ID", getLocationById);
router.get("/getAllLocation", getAllLocation);
router.post("/addLocation", addLocation);
router.put("/editLocation", editLocation);
router.delete("/deleteLocation/:L_ID", deleteLocation);

module.exports = router;