const ErrorResponse = require("../utils/errorResponse")

const errorHandler = async(err,req,res,next) => {

    let error = {...err }
    error.message = err.message

    console.log(err)

    //Mongoose Bad Object
    if(err.message === 'CastError')
    {
        const message = `User not found  with id of ${email}`
        error = new ErrorResponse(message,404)
    }

    //Mongoose duplicate key
    if(err.code === 11000)
    {
        const message = `Email already exists with ${req.body.email} in our database`
        error = new ErrorResponse(message,400)
    }
    
    //Mongoose validation Error
    if(err.name === 'ValidationError')
    {
        const message = Object.values(err.errors).map(val => val.message)
        error = new ErrorResponse(message,400)

    }
    res.status(error.statusCode || 500).json({
        success:false,
        error:error.message || `Server Error`
    })
}

module.exports = errorHandler