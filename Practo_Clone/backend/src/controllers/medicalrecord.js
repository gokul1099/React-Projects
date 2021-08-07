const MedicalRecord = require('../models/medicalrecord')

//@desc uploading medical record 
//@route POST/patient-medical-history
//@access Private
exports.uploadMedicalRecord = async(req,res,next) => {
    try {
        const result = await Patient.findOne({ _id: `${req.query.id}` })
        const med = await new MedicalRecord({
          patient_id: result._id,
          name: result.name,
        });
        if (req.files.xray) {
          let path = [];
          req.files.xray.forEach(function (files, index, arr) {
            if (
              files.mimetype == "image/png" ||
              files.mimetype == "image/jpg" ||
              files.mimetype == "image/jpeg"
            )
              path.push(files.buffer)
            else
              return res
                .sendStatus(400)
                .send("Please upload images only for X-ray")
          });
          med.xray = path;
        } else return res.sendStatus(400).send("No files attached")
        if (req.files.medicaldoc) {
          let path = [];
          req.files.medicaldoc.forEach(function (files, index, arr) {
            if (
              files.mimetype ==
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            )
              path.push(files.buffer)
            else
              return res
                .sendStatus(400)
                .send("Please upload Word document only for Medical document")
          })
          med.medicaldoc = path;
        } else return res.sendStatus(400).send("No files attached")
        if (req.files.report) {
          let path = [];
          req.files.report.forEach(function (files, index, arr) {
            if (files.mimetype == "application/pdf") path.push(files.buffer)
            else
              return res
                .sendStatus(400)
                .send("Please upload PDF only for report")
          });
          med.report = path;
        } else return res.sendStatus(400).send("No files attached");
        if (req.files.currentMedicine) {
          let path = [];
          req.files.currentMedicine.forEach(function (files, index, arr) {
            if (
              files.mimetype == "image/png" ||
              files.mimetype == "image/jpg" ||
              files.mimetype == "image/jpeg"
            )
              path.push(files.buffer)
            else
              return res
                .sendStatus(400)
                .send("Please upload Image for Current medicine")
          })
          med.currentMedicine = path
        } else return res.status(400).send("No files attached")
        med.save();
        res.sendStatus(200).send("Patient Medical history created")
      } catch (error) {
        res.sendStatus(400).send("No user found")
      }
    }




//@desc updating the medical documents
//@route PUT//update-patient-medical-history
//@access Private
exports.updateMedicalRecord = async(req,res) => {
    try {
        let xray = [],
          medicaldoc = [],
          report = [],
          currentMedicine = [];
        if (req.files.update_details) {
          req.files.update_details.forEach(function (files, index, arr) {
            if (files.mimetype == "application/pdf") report.push(files.buffer)
            else if (
              files.mimetype == "image/png" ||
              files.mimetype == "image/jpg" ||
              files.mimetype == "image/jpeg"
            )
              xray.push(files.buffer)
            else if (
              files.mimetype ==
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            )
              medicaldoc.push(files.buffer);
            else return res.sendStatus(400).send("Attach required file formats")
          });
        } else return res.status(400).send("No files attached")
        if (req.files.currentMedicine) {
          req.files.currentMedicine.forEach(function (files, index, arr) {
            if (
              files.mimetype == "image/png" ||
              files.mimetype == "image/jpg" ||
              files.mimetype == "image/jpeg"
            )
              currentMedicine.push(files.buffer)
          })
        } else return res.sendStatus(400).send("No files attached")
        await MedicalRecord.findOneAndUpdate({
          patient_id: `${req.query.id}`,
          $push: {
            report: report,
            currentMedicine: currentMedicine,
            xray: xray,
            medicaldoc: medicaldoc,
          },
        })
        res.status(200).send("Patient medical history updated")
      } catch (error) {
        console.log(error.message)
        res.sendStatus(400).send("No user found")
      }
    }
  
//@desc getting or fetching the medical history of the patient
//@route GET//list-patient-medical-history
//@access Private
exports.getMedicalHistory = async(req,res) => {
    try {
        const medic_history = await MedicalRecord.findOne({
          patient_id: `${req.query.id}`,
        })
        if (medic_history.length) res.status(200).send(medic_history)
        else res.sendStatus(400).send("No user found")
      } catch {
        res.sendStatus(400).send("No user found")
      }
}


//@desc deleting the medical history
//@route DELETE//delete-medical-history
//@access Private
exports.deleteMedicalHistory = async(req,res) => {
    try {
    const result = await MedicalRecord.findOneAndDelete({
      patient_id: `${req.query.id}`,
    })
    res.sendStatus(200).send("Patient Medical History deleted")
  } 
  catch (error) {
    res.sendStatus(400).send("No User found")
  }
}
