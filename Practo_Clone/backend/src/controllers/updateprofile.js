const { Doctor, Patient } = require('../db/index')
const ErrorResponse = require('../utils/errorResponse')
const path = require('path')




//@desc updating doctor profile
//@route PUT/doctorprofile
//@access Private
exports.updateDoctorProfile = async (req, res, next) => {
    try {
        const result = await Doctor.findByIdAndUpdate(
            { _id: `${req.query.id}` },
            {
                $set: {
                    age: `${req.body.age}`,
                    specialisation: `${req.body.specialisation}`
                },
            }
        );
        result.avaliableSlots = req.body.slots.split(",");
        result.save();
        res.status(200).send("user profile updated successfully");
    } catch (err) {
        console.log(err);
        next(err)
    }
}

//@desc updating patient profile
//@route PUT/userprofile
//@access Private
exports.updatePatientProfile = async (req, res, next) => {
    try {
        const result = await Patient.findByIdAndUpdate(
            { _id: `${req.query.id}` },
            {
                $set: {
                    age: `${req.body.age}`,
                    blood_group: `${req.body.blood_group}`,
                    date_of_birth: `${req.body.date_of_birth}`,
                    location: `${req.body.location}`,
                    avatar: `${req.file.buffer}`,
                },
            }
        );
        result.save();
        res.sendStatus(200).send("user profile updated successfully");
    } catch (err) {
        next(err)
    }
}

//@desc uploading profile picture for patient profile
//@route PUT/:id/user/photo
//@access Private
exports.patientPhotoUpload = async (req, res, next) => {
    const patient = await Patient.findById(req.params.id)
    console.log(req.params.id)
    if (!patient) {
        console.log(err)
        return next(
            new ErrorResponse(`Patient not found with id of ${req.params.id}`, 400)
        )
    }
    if (!req.files) {
        return next(
            new ErrorResponse(`Please upload a file`, 400)
        )
    }
    const file = req.files.file
    if (!file.mimetype.startsWith('image')) {
        return next(
            new ErrorResponse(`Please upload a image file`, 400)
        )

    }
    if (file.size > process.env.MAX_FILE_SIZE) {
        return next(
            new ErrorResponse(`Please upload a image file of size less than ${process.env.MAX_FILE_SIZE}`, 400)
        )

    }
    file.name = `photo_${patient._id}${path.parse(file.name).ext}`
    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
        if (err) {
            console.log(err)
            return next(
                new ErrorResponse(`file or directory not found`, 500)
            )

        }
        await Patient.findByIdAndUpdate(req.params.id, { photo: file.name })
        res.status(200).json({
            success: true,
            data: file.name
        })
    })


}

//@desc uploading profile picture for doctor profile
//@route PUT/:id/doctor/photo
//@access Private
exports.doctorPhotoUpload = async (req, res, next) => {
    const doctor = await Doctor.findById(req.params.id)

    if (!doctor) {
        return next(
            new ErrorResponse(`Doctor not found with id of ${req.params.id}`, 400)
        )
    }
    if (!req.files) {
        return next(
            new ErrorResponse(`Please upload a file`, 400)
        )
    }
    const file = req.files.file
    if (!file.mimetype.startsWith('image')) {
        return next(
            new ErrorResponse(`Please upload a image file`, 400)
        )

    }
    if (file.size > process.env.MAX_FILE_SIZE) {
        return next(
            new ErrorResponse(`Please upload a image file of size less than ${process.env.MAX_FILE_SIZE}`, 400)
        )

    }
    file.name = `photo_${doctor._id}${path.parse(file.name).ext}`
    console.log(file.name)
    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
        if (err) {
            console.log(err)
            return next(
                new ErrorResponse(`file or directory not found`, 500)
            )

        }
        await Doctor.findByIdAndUpdate(req.params.id, { photo: file.name })
        res.status(200).json({
            success: true,
            data: file.name
        })
    })


}




