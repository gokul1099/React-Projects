const express = require("express")
const {
  createSignup,
  createLogin
} = require('../controllers/login')


const router = new express.Router()

router
.route('/signup')
.post(createSignup)

router
.route('/login')
.post(createLogin)


module.exports = router
