const jwt = require("jsonwebtoken");
const { Patient, Doctor } = require("../db/index");
const errorResponse = require('../utils/errorResponse')

const authentication = async (req, res, next) => {

     try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "thisisforauthentication");
    let user = Doctor.findOne({ _id: decoded._id, "tokens.token": token });
    if (!user) {
      user = Patient.findOne({ _id: decoded._id, "tokens.token": token });
      if (!user)
       throw new Error(`Not authorized to access the route`,401);
    }
    req.user = user;
  } catch(err) {
    next(err)
  }
};

// const authdoctor = async (req, res, next) => {
//   try {
//     const token = req.header("Authorization").replace("Bearer ", "");
//     const decoded = jwt.verify(token, "thisisforauthentication");
//     let user = Doctor.findOne({ _id: decoded._id, "tokens.token": token });
//     if (!user) throw new Error();
//     req.user = user;

//     next();
//   } catch {
//     res.status(401).send({ error: "Doctors dont have access" });
//   }
// };

// const authpatient = async (req, res, next) => {
//   try {
//     const token = req.header("Authorization").replace("Bearer ", "");
//     const decoded = jwt.verify(token, "thisisforauthentication");
//     let user = Patient.findOne({ _id: decoded._id, "tokens.token": token });
//     if (!user) throw new Error();
//     req.user = user;

//     next();
//   } catch {
//     res.status(401).send({ error: "Patients dont have access" });
//   }
// };

//creating a review for a doctor

module.exports = authentication