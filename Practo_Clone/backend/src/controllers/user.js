const {
    Doctor,
    Patient
   } = require('../db/index')
const ErrorResponse = require('../utils/errorResponse')

//@desc getting or fetching a doctor
//@route GET/doctor/:id
//@access Public
exports.getDoctor = async (req,res,next) => {
    try {
        const doctor = await Doctor.findById(req.params.id)
        res.send({success:true, data: doctor.getPublicProfile()})
        
    } catch (error) {
        next(
            new ErrorResponse(`Doctor not found  with id of ${req.params.id}`,404)
 
        )
        
    }

}

//@desc getting or fetching all doctors
//@route GET/doctorlist
//@access Public
exports.getDoctors = async (req,res,next) => {
    try {
        const Doctors = await Doctor.find()
        res.send({success:true,data:Doctors})
    } catch (err) {
        next(err)
    }
}



//@desc getting or fetching all patients
//@route GET/userlist
//@access Public
exports.getPatients = async (req,res,next) => {
    try {
        const Patients = await Patient.find()
        res.send({success:true, data: Patients})
        
    } catch (err) {
        next(err)
        
    }

}

//@desc getting or fetching patient
//@route GET/user/:id
//@access Public
exports.getPatient = async (req,res,next) => {
    try {
        const patient = await Patient.findById(req.params.id)
        res.send({success:true, data: patient.getPublicProfile()})
        
    } catch (error) {
        next(
            new ErrorResponse(`Patient not found  with id of ${req.params.id}`,404)
        )
        
    }

}
