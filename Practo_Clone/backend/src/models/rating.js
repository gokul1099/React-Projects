const mongoose = require('mongoose')
const validator = require('validator')
const Doctor = require('../models/doctors')



const ratingSchema = new mongoose.Schema({
    review:{
        type:String,
        require:[true,'please post your review'],
        maxlength:100
    },

    stars:{
        type:Number,
        min:1,
        max:5,
        require:[true,'please rate the doctor']
        
    },

    createdAt:{
        type:Date,
        default:Date.now
    },
    doctor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Doctor',
        require:true
    },
    patient:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Patient',
        require:true
    }
  })


  //calculating average rating for the doctor
  ratingSchema.statics.getAverageRating = async function(doctorId){
      const obj = await Rating.aggregate([
          {
              $match: { doctor: doctorId}
          },
          {
              $group:{
                  _id: '$doctor',
                  averageRating: { $avg: '$stars'}
              }
          }
      ])
      

      try{
          await Doctor.findByIdAndUpdate(
               {_id: doctorId},
               {$set : {averageRating: obj[0].averageRating}}
          )
      }
      catch(error){
          console.log(error)
      }
    }
       
  
//fetching average rating after saving
  ratingSchema.post('save',function(){
      this.constructor.getAverageRating(this.doctor)
  })

//fetching average rating before saving
  ratingSchema.pre('save',function(){
    this.constructor.getAverageRating(this.doctor)
})


const Rating =  new mongoose.model('Rating',ratingSchema)

module.exports= Rating