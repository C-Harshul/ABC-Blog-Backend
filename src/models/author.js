const mongoose = require('mongoose')
const validator = require('validator')

const Author = mongoose.model('Author',{
    name:{
        type: String,
        require: true,
        default:'anonymous'
   },
 
   email:{
       type: String,
       validate(value) {
           if(!validator.isEmail(value)){
              throw new Error('Email is invalid')
           }
       },
       default:'anonymous'
   },
   
})

module.exports = Author