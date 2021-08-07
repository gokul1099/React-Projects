const express = require("express");
const {updateDoctorProfile,
       updatePatientProfile,
       doctorPhotoUpload,
       patientPhotoUpload
} = require('../controllers/updateprofile')
const{ authdoctor} = require('../middleware/authdoctor')
const {authpatient} = require('../middleware/authpatient')


const router = new express.Router();


router.route('/doctorprofile').put(updateDoctorProfile)
router.route('/userprofile').put(updatePatientProfile)
router.route('/:id/doctor/photo').put(authdoctor,doctorPhotoUpload)
router.route('/:id/user/photo').put(authpatient,patientPhotoUpload)


module.exports = router;
