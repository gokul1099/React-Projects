const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const doctorSchema = new mongoose.Schema({
  doctor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
  },
  name: {
    type: String,
    required: [true,'Please add a name'],
    trim: true,
  },

  email: {
    type: String,
    required: [true,'please add a email'],
    unique: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  password: {
    type: String,
    require: true,
    validate(value) {
      if (value.length<8) {
        throw new Error("Password should be strong enough and of eight characters");
      }
    },
  },

  isDoctor: {
    type: Boolean,
    require: true,
  },

  age: {
    type: Number,
  },

  specialisation: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rating",
    },
  ],
  averageRating: {
    type: Number,
    default: 0,
  },
  photo: {
    type: String,
  },
  avaliableSlots: {
    type: Array,
  },
});

//generating jwt tokens
doctorSchema.methods.generateAuthToken = async function () {
  const doctor = this;

  const token = jwt.sign(
    { _id: doctor._id.toString() },
    "thisisforauthentication"
  );

  await doctor.save();
  return token
}

//hiding private details of the user
doctorSchema.methods.getPublicProfile = function () {
  const doctor = this;
  const doctorObject = doctor.toObject();

  delete doctorObject.password;
  delete doctorObject.tokens;

  return doctorObject;
};

//validating the entered email and password
doctorSchema.statics.findByCredentials = async (email, password) => {
  const user = await Doctor.findOne({ email });

  if (!user) {
    throw new Error("Email does not exists");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("password is incorrect");
  }
  return user;
};


//Hashing the password before saving
doctorSchema.pre("save", async function (next) {
  const doctor = this;

  if (doctor.isModified("password")) {
    doctor.password = await bcrypt.hash(doctor.password, 8);
  }

  next();
});

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
