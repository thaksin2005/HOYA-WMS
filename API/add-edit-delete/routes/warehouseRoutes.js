// routes/warehouseRoutes.js
// const express = require("express");
// const router = express.Router();
// const warehouseController = require("../controllers/warehouseController");

// router.get("/getWarehouse", warehouseController.getWarehouseById);
// router.post("/addWarehouse", warehouseController.addWarehouse);
// router.put("/editWarehouse", warehouseController.editWarehouse);
// router.delete("/deleteWarehouse/:W_ID", warehouseController.deleteWarehouse);

// module.exports = router;


const express = require("express");
const router = express.Router();
const { addWarehouse, editWarehouse, deleteWarehouse, getWarehouseById, getAllWarehouse } = require("../controllers/warehouseController");

router.get("/getAllWarehouse", getAllWarehouse);
router.get("/getWarehouse", getWarehouseById);
router.post("/addWarehouse", addWarehouse);
router.put("/editWarehouse", editWarehouse);
router.delete("/deleteWarehouse/:W_ID", deleteWarehouse);

module.exports = router;

// const express = require("express");
// const router = express.Router();
// const { addFactory, editFactory, deleteFactory, getFactoryById } = require("../controllers/factoryController");

// router.get("/getFactory/:F_ID", getFactoryById);
// router.post("/addFactory", addFactory);
// router.put("/editFactory", editFactory);
// router.delete("/deleteFactory/:F_ID", deleteFactory);

// module.exports = router;