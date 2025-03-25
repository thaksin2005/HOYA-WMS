const express = require("express");
const router = express.Router();
const { addUserAccount, editUserAccount, deleteUserAccount } = require("../controllers/userAccountController");

router.post("/addUserAccount", addUserAccount);
router.put("/editUserAccount", editUserAccount);
router.delete("/deleteUserAccount/:UA_ID", deleteUserAccount);

module.exports = router;