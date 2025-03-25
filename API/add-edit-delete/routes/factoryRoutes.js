const express = require("express");
const router = express.Router();
const { addFactory, editFactory, deleteFactory, getFactoryById, getAllFactories } = require("../controllers/factoryController");

router.get("/getFactory/:F_ID", getFactoryById);
router.get("/getAllFactory", getAllFactories);
router.post("/addFactory", addFactory);
router.put("/editFactory", editFactory);
router.delete("/deleteFactory/:F_ID", deleteFactory);

module.exports = router;