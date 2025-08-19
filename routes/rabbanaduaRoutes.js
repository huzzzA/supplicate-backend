const express = require('express');
const router = express.Router();
const {getRabbanaDuas} = require('../controllers/rabannaduaController');

// GET /api/rabbanaduas/getRabbanaDuas
router.get('/getRabbanaDuas', getRabbanaDuas);




module.exports = router;