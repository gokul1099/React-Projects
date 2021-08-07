const Appointments = require('../models/appointments')


//@desc create a appointment 
//@route POST/newapp
//@access Private
exports.createAppointment = async (req,res,next) => {
    try {
        const app = new Appointments(req.body)
        await app.save()
        res.sendStatus(200).json({success:true, msg: 'Appointment is created successfully'})
      } catch(err){
        next(err)
      }
}

//@desc get patients appointment
//@route GET/listapp-patient
//@access Private
exports.getAppointment = async (req,res,next) => {
    try {
        const result = await Appointments.find({ patient_id: `${req.query.id}` })
        result.length ? res.send(result) : res.sendStatus(404)
      } catch(err){
        next(err)

        
      }
}

//@desc get doctors appointment
//@route GET/listapp-doctor
//@access Private
exports.getDoctorAppointment = async (req,res,next) => {
    try {
        const result = await Appointments.find({ doctor_id: `${req.query.id}` })
        result.length ? res.send(result) : res.sendStatus(404)
      } catch(err) {
        next(err)
        
      }
}

//@desc update patients appointment
//@route PUT/update-status
//@access Private
exports.updateAppointment = async (req,res,next) => {
    try {
        const result = await Appointments.findByIdAndUpdate(
          { _id: `${req.query.id}` },
          { $set: { accept_status: `${req.query.status}` } }
        );
        result.save();
        res.sendStatus(200).send(result)
      } catch (err) {
        next(err)
      }
}


