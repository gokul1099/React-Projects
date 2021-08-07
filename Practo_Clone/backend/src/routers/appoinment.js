const express = require("express");
const {
       createAppointment,
       getAppointment,
       getDoctorAppointment,
       updateAppointment
      }  = require('../controllers/appointment')                             


const router = new express.Router()

router
.route('/newapp')
.post(createAppointment)

router
.route('/listapp-patient')
.get(getAppointment)

router
.route('/listapp-doctor')
.get(getDoctorAppointment)

router
.route('/update-status')
.put(updateAppointment)



module.exports = router;
