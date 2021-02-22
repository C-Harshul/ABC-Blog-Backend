const mongoose = require('mongoose')
const validator = require('validator')


const blogSchema = new mongoose.Schema({
   title: {
       type:String,
       required:true,
   },
   body:{
       type:String,
       required:true
   },

   link:{
       type: String,
   },
   link:{
       type:String,
       validate(val){
           if(!validator.isURL(val)){
               throw new Error('Give a valid Url')
           }
       }
   },
   categories: {
       type: mongoose.Schema.Types.Mixed,
       required:true,
       default: ['blogs']
   },
   author: {
       type: mongoose.Schema.Types.ObjectId,
       ref:'Author'
   }
 },{
  timestamps:true
 }
)

const Blog = mongoose.model('Blog',blogSchema)
module.exports = Blog