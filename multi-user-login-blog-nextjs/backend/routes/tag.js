const express = require('express');
const router = express.Router();
const { createTag, listTags, read, remove } = require("../controllers/tag")

//VALIDTORS

const { runValidation } = require("../validator")
const { requireSignin, adminMiddleware } = require("../controllers/auth");
const { tagCreateValidator } = require('../validator/tag');

router.post('/tag', tagCreateValidator, runValidation, requireSignin, adminMiddleware, createTag);
router.get("/list_tag", listTags)
router.get("/tag/:slug", read)
router.delete("/tag/:slug", requireSignin, adminMiddleware, remove)
module.exports = router;