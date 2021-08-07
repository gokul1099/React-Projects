const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    appointment_time: {
      type: String,
      require: true,
    },
    accept_status: {
      type: String,
      default: "Pending",
    },
    doctor_id: {
      type: String,
      require: true,
    },
    patient_id: {
      type: String,
      require: true,
    },
    appointment_date: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Appointments = mongoose.model("appointment", appointmentSchema);
module.exports = Appointments;
