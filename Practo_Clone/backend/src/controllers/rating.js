const Rating = require('../models/rating')

//@desc create an rating for a doctor
//@route POST/review/:id
//@access Private
exports.createRating = async(req,res,next) => {
    const rating = Rating.create(req.body)
    .then(function (rating) {
      return Doctor.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { reviews: rating } },
        { new: true }
      )
    })
    .then(function (dbDoctor) {
      res.json(dbDoctor);
    })
    .catch(function (err) {
      next(err)
      
    })

}

//@desc getting the ratings and feedback for a doctor
//@route GET/review/:id
//@access Private
exports.getRating = async(req,res,next) => {
    Doctor.findOne({ _id: req.params.id })
    .populate("reviews")
    .then(function (dbDoctor) {
      res.json(dbDoctor);
    })
    .catch(function (err) {
      next(err)
    })
}

//@desc updating the reviews 
//@route PUT/update_reviews
//@access Private
exports.updateRating = async(req,res,next) => {
    let review = Rating.findById(req.query.id)

  if(!review){
    return next(
      new ErrorResponse(
        `No review with the id of ${req.query.id}`,
        404
      )
    )
  }
 
 review = Rating.findByIdAndUpdate(req.query.id,req.body,{
  new:true,
  runValidators:true
})

res.status(200).json({
  success:true,
  data:review
})
}

//@desc deleting the rating 
//@route DELETE/reviews
//@access Private
exports.deleteRating = async(req,res) => {
    const review = Rating.findById(req.query.id)

    if(!review){
      return next(
        new ErrorResponse(
          `No review with the id of ${req.query.id}`,
          404
        )
      )
    }
    //Make sure the review belongs to user or patient
    if(review.patient.toString() !== req.patient.id)
    {return next(
      new ErrorResponse(
        'Not authorized to update the review',
        404
      )
    )
  }
   
  await review.remove()
  
  res.status(200).json({
    success:true,
    data:{}
  })
  }
  
  
