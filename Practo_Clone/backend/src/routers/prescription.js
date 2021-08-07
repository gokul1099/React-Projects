const express = require("express");
const {
  updatePrecriptionList,
  getPrescription,
  deletePrescription,
  createPrescription
} = require('../controllers/prescription')

const router = new express.Router()

router
.route('/prescription')
.post(createPrescription)

router
.route('/prescriptionlist')
.get(getPrescription)

router
.route('/update_prescriptionlist')
.put(updatePrecriptionList)

router
.route('/delete_prescriptionlist')
.delete(deletePrescription)





module.exports = router;
