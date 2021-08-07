const express = require("express");
const { MedicalRecord, Patient, dbConnection } = require("../db/index");
const authentication = require('../middleware/authentication')
const router = new express.Router();
const multer = require("multer");

const documents = multer({
  limits: {
    fileSize: 4000000,
  },
});
router.post(
  "/patient-medical-history",
  authentication,
  documents.fields([
    { name: "medicaldoc", maxCount: 3 },
    { name: "xray", maxCount: 5 },
    { name: "report", maxCount: 2 },
    { name: "currentMedicine", maxCount: 5 },
  ]),
  async (req, res) => {
    try {
      const result = await Patient.findOne({ _id: `${req.query.id}` });
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
            path.push(files.buffer);
          else
            return res
              .sendStatus(400)
              .send("Please upload images only for X-ray");
        });
        med.xray = path;
      } else return res.sendStatus(400).send("No files attached");
      if (req.files.medicaldoc) {
        let path = [];
        req.files.medicaldoc.forEach(function (files, index, arr) {
          if (
            files.mimetype ==
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          )
            path.push(files.buffer);
          else
            return res
              .sendStatus(400)
              .send("Please upload Word document only for Medical document");
        });
        med.medicaldoc = path;
      } else return res.sendStatus(400).send("No files attached");
      if (req.files.report) {
        let path = [];
        req.files.report.forEach(function (files, index, arr) {
          if (files.mimetype == "application/pdf") path.push(files.buffer);
          else
            return res
              .sendStatus(400)
              .send("Please upload PDF only for report");
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
            path.push(files.buffer);
          else
            return res
              .sendStatus(400)
              .send("Please upload Image for Current medicine");
        });
        med.currentMedicine = path;
      } else return res.status(400).send("No files attached");
      med.save();
      res.sendStatus(200).send("Patient Medical history created");
    } catch (error) {
      res.sendStatus(400).send("No user found");
    }
  }
);

router.put(
  "/update-patient-medical-history",
  authentication,
  documents.fields([
    { name: "update_details", maxCount: 10 },
    { name: "currentMedicine", maxCount: 5 },
  ]),
  async (req, res) => {
    try {
      let xray = [],
        medicaldoc = [],
        report = [],
        currentMedicine = [];
      if (req.files.update_details) {
        req.files.update_details.forEach(function (files, index, arr) {
          if (files.mimetype == "application/pdf") report.push(files.buffer);
          else if (
            files.mimetype == "image/png" ||
            files.mimetype == "image/jpg" ||
            files.mimetype == "image/jpeg"
          )
            xray.push(files.buffer);
          else if (
            files.mimetype ==
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          )
            medicaldoc.push(files.buffer);
          else return res.sendStatus(400).send("Attach required file formats");
        });
      } else return res.status(400).send("No files attached");
      if (req.files.currentMedicine) {
        req.files.currentMedicine.forEach(function (files, index, arr) {
          if (
            files.mimetype == "image/png" ||
            files.mimetype == "image/jpg" ||
            files.mimetype == "image/jpeg"
          )
            currentMedicine.push(files.buffer);
        });
      } else return res.sendStatus(400).send("No files attached");
      await MedicalRecord.findOneAndUpdate({
        patient_id: `${req.query.id}`,
        $push: {
          report: report,
          currentMedicine: currentMedicine,
          xray: xray,
          medicaldoc: medicaldoc,
        },
      });
      res.status(200).send("Patient medical history updated");
    } catch (error) {
      console.log(error.message);
      res.sendStatus(400).send("No user found");
    }
  }
);

router.get(
  "/list-patient-medical-history",
  authentication,
  async (req, res) => {
    try {
      const medic_history = await MedicalRecord.findOne({
        patient_id: `${req.query.id}`,
      });
      if (medic_history.length) res.status(200).send(medic_history);
      else res.sendStatus(400).send("No user found");
    } catch {
      res.sendStatus(400).send("No user found");
    }
  }
)

router.delete("/delete-medical-history", authentication, async (req, res) => {
  try {
    const result = await MedicalRecord.findOneAndDelete({
      patient_id: `${req.query.id}`,
    });
    res.sendStatus(200).send("Patient Medical History deleted");
  } catch (error) {
    res.sendStatus(400).send("No User found");
  }
});
module.exports = router;
