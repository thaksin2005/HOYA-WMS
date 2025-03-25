// const express = require("express");
// const { getMoldBlockData } = require("../controllers/moldBlockController");

// const router = express.Router();

// router.get("/moldblock", async(req, res) => {
//     try {
//         const data = await getMoldBlockData();
//         res.status(200).json(data);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// module.exports = router;

// const express = require("express");
// const { checkAndSendMoldBlockData } = require("../controllers/moldBlockController");

// const router = express.Router();

// router.get("/check-update", async(req, res) => {
//     await checkAndSendMoldBlockData();
//     res.send("Checked and updated Mold Block data.");
// });

// module.exports = router;

// routes/moldBlockRoutes.js
const express = require('express');
const router = express.Router();
const { fetchAndUpdateMoldBlock } = require('../controllers/moldBlockController');

router.get('/update-mold-block', async (req, res) => {
    await fetchAndUpdateMoldBlock();
    res.send('Mold block data checked and updated if needed.');
});

module.exports = router;