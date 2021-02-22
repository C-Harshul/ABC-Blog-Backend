const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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
   },
   tokens :[{
       token:{
           type:String,
           required:true
       }
   }]
   
},{
    timestamps:true
 }
)

authorSchema.virtual('blogs' ,{
    ref: 'Blog',
    localField : '_id',
    foreignField: 'author'
})

authorSchema.methods.generateAuthToken = async function() {
    const author = this
    console.log(author)
    const token = jwt.sign({_id:author._id.toString()},'Authortoken')
     console.log(token)
    author.tokens = author.tokens.concat({token})
    console.log(author)
    await author.save()
    
    return token
}

authorSchema.statics.findCredentials  = async (email,password) => {
    const author = await Author.findOne({email})
    console.log(author)
    if(!author) {
        throw new Error('No author with the provided EmailID')
    }
    const isMatch = await bcrypt.compare(password,author.password)
    console.log(isMatch)
    if(!isMatch) {
        throw new Error ('Incorrect password')
    }
    return author

} 

authorSchema.pre('save' , async function(next) {
   const author = this
   if(author.isModified('password')){
       author.password = await bcrypt.hash(author.password,8)
   }
  next()
})

const Author = mongoose.model('Author',authorSchema)

module.exports = Author