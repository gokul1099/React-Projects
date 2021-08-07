const express = require('express')
const {
    getDoctors,
    getDoctor,
    getPatients,
    getPatient
     } = require('../controllers/user')

const router = new express.Router()

router
.route('/doctor/:id')
.get(getDoctor)

router
.route('/doctorlist')
.get(getDoctors)

router
.route('/user/:id')
.get(getPatient)

router
.route('/userlist')
.get(getPatients)



  



   module.exports = router