const express = require('express');
const router = express.Router();
const { create, list, read, remove } = require('../controllers/category');

// validator
const { runValidation } = require("../validator")
const { requireSignin, adminMiddleware } = require("../controllers/auth");
const { categoryCreateValidator } = require('../validator/category');

router.post('/category', categoryCreateValidator, runValidation, requireSignin, adminMiddleware, create);
router.get('/categories', list);
router.get('/category/:slug', read);
router.delete('/category/:slug', requireSignin, adminMiddleware, remove);
module.exports = router;