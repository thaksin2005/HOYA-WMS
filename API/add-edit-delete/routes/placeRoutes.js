const express = require("express");
const router = express.Router();
const { addPlace, editPlace, deletePlace, getPlaceById, getAllPlace } = require("../controllers/placeController");

router.get("/getPlace/:P_ID", getPlaceById);
router.post("/getAllPlace", getAllPlace);
router.post("/addPlace", addPlace);
router.post("/addPlace", addPlace);
router.put("/editPlace", editPlace);
router.delete("/deletePlace/:P_ID", deletePlace);

module.exports = router;