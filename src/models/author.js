const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const authorSchema = mongoose.Schema({
    name:{
        type: String,
        require: true,
        default:'anonymous'
   },
 
   email:{
       type: String,
       trim: true,
       required:true,
       unique:true, 
       validate(value) {
           if(!validator.isEmail(value)){
              throw new Error('Email is invalid')
           }
       },
   },

   password : {
       type:String,
   }
   
},{
    timestamps:true
 }
)

authorSchema.pre('save' , async function(next) {
   const author = this
   if(author.isModified('password')){
       author.password = await bcrypt.hash(author.password,8)
   }
  next()
})

const Author = mongoose.model('Author',authorSchema)

module.exports = Author