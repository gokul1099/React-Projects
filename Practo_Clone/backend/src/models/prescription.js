const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema(
  {
    patient_id: {
      type: String,
      require: true,
      trim: true,
    },
    doctor_id: {
      type: String,
      require: true,
      trim: true,
    },
    prescribed_medicines: [
      {
        type: String,
        require: true,
      },
    ],
    appointment_id: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Prescription = mongoose.model("Prescription", prescriptionSchema);

module.exports = Prescription;
