const prescription = require('../models/prescription')

//@desc creating a prescription list
//@route POST/prescription
//@access Private
exports.createPrescription = async(req,res,next) => {
    try {
        const prescription = new Prescription(req.body);
        await prescription.save();
        res.status(200).send(prescription)
      } catch (err) {
        next(err)
      }
}


//@desc getting or fetching the prescribed medicines by patients
//@route GET/prescriptionlist
//@access Private
exports.getPrescription = async (req,res,next) => {
try {
    const result = await Prescription.find({
      appointment_id: `${req.query.id}`,
    })
    res.sendStatus(200).send(result)
  } catch(err) {
    next(err)
  }
}



//@updating or adding new prescription list
//@route PUT/update_prescriptionlist
//@access Private
exports.updatePrecriptionList = async(req,res,next) => {
try {
    const result = await Prescription.findByIdAndUpdate(
      { _id: `${req.query.id}` },
      { $set: { prescribed_medicines: `${req.body.medicines}` } }
    )
    result.save()
    res.sendStatus(200).send(result)
  } catch (err) {
    next(err)
  }
}


//@desc pushing or updating more medicines to the existing prescribed medicines
//@route PUT//update_prescriptionlist
//@access Private
exports.updateExistingPrescrition = async(req,res,next) => {
    try {
        const result = await Prescription.findByIdAndUpdate(
          { _id: `${req.query.id}` },
          { $push: { prescribed_medicines: `${req.body.medicines}` } }
        )
        result.save()
        res.sendStatus(200).send(result)
      } catch (err) {
        next(err)
      }
}


//@desc deleting the prescription list
//@route DELETE/delete_medicines
//@access Private
exports.deletePrescription = async(req,res,next) => {
try {
    const result = await Prescription.findByIdAndUpdate(
      { _id: `${req.query.id}` },
      { $pull: { prescribed_medicines: `${req.body.medicines}` } }
    )
    result.save()
    res.sendStatus(200).send(result)
  } catch (err) {
    next(err)
  }
}
