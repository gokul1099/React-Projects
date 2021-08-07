const jwt = require("jsonwebtoken");
const { Patient } = require("../db/index");
const ErrorResponse = require('../utils/errorResponse')


  exports.authpatient = async (req, res, next) => {
    let token
    if(
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    )
    {
      token = req.headers.authorization.split(' ')[1]
    }
    //Make sure token exists
    if(!token)
    {
      return next(new ErrorResponse(`Not authorized to access the route`,401))
    }
  try {
     const decoded = jwt.verify(token, "thisisforauthentication");
    console.log(decoded.id)
    req.user= await Patient.findOne(decoded.id);
    next()
  } catch(err) {
    return next(new ErrorResponse(`Not authorized to access the route`,401))
  }
};




