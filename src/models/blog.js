const mongoose = require('mongoose')
const validator = require('validator')


const Blog = new mongoose.model('Blog',{
   title: {
       type:String,
       required:true,
   },
   body:{
       type:String,
       required:true
   },
   author:{
       type: String,
       required: true,
   },
   link:{
       type: String,
   },
   timeStamp:{
       type: String,
       required:true
   },
   link:{
       type:String,
       validate(val){
           if(!validator.isURL(val)){
               throw new Error('Give a valid Url')
           }
       }
   }
})

module.exports = Blog