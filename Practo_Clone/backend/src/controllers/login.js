const { Doctor,Patient } = require('../db/index')


//@desc signup for a new user
//@route POST/signup
//@access Public
exports.createSignup = async (req,res,next) => {
    try {
        if (req.body.isDoctor) {
          const user = new Doctor(req.body)
          await user.save()
          const token = await user.generateAuthToken()
          res.sendStatus(201).send({ user: user.getPublicProfile(), token })
        }
         else {
          const user = new Patient(req.body)
          await user.save()
          const token = await user.generateAuthToken()
          res.sendStatus(201).send({ user: user.getPublicProfile(), token })
        }
      } catch (err) {
        next(err)
      }
}


//@desc login for a existing user
//@route POST/login
//@access Public
exports.createLogin = async (req,res,next) => {
    try {
        if (req.body.isDoctor) {
          const user = await Doctor.findByCredentials(
            req.body.email,
            req.body.password
          )
    
          const token = await user.generateAuthToken()
          res.send({ token, user: user.getPublicProfile() })
        } else {
          const user = await Patient.findByCredentials(
            req.body.email,
            req.body.password
          )
    
          const token = await user.generateAuthToken()
          res.send({ token, user: user.getPublicProfile() })
        }
      } catch (err) {
        next(err)
      }
}
