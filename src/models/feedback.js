const mongoose = require('mongoose')

const feedbackSchema = mongoose.Schema({
 
    subscriber :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Subscriber'
    },
    blog:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Blog'
    },
    feedback :{
        type: String,
        required:true
    } 


},{
    timestamps:true
 }
)

const Feedback = mongoose.model('Feedback',feedbackSchema)

module.exports = Feedback