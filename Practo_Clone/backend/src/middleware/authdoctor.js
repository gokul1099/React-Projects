const jwt = require("jsonwebtoken");
const ErrorResponse = require('../utils/errorResponse')
const { Doctor } = require("../db/index");

exports.authdoctor = async (req, res, next) => {
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
     console.log(token)
    req.user= await Doctor.findOne(decoded.id);
    next()
  } catch(err) {
    return next(new ErrorResponse(`Not authorized to access the route`,401))
  }
};


