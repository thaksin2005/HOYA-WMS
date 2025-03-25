const express = require('express');
const router = express.Router();
const { controlMoldBlock } = require('../controllers/moldController');

router.post('/', controlMoldBlock);

module.exports = router;