const express = require('express');
const router = express.Router();
const {getDuaCategories, getDuaSubCategories, getDuas} = require('../controllers/duaController');

// GET /api/duas/getDuaCategories
router.get('/getDuaCategories', getDuaCategories);
router.get('/getDuaSubCategories', getDuaSubCategories);
router.get('/getDuas', getDuas);




module.exports = router;