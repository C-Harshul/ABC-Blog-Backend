const mongoose = require('mongoose')
const validator = require('validator')

const subscriberSchema = mongoose.Schema({
    name:{
        type:String,
    },
    emailId:{
        type:String,
        require:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Enter a valid mail ID')
            }
        }
    },
},{
    timestamps:true
  }
)

subscriberSchema.virtual('feedbacks',{
    ref:'Feedback',
    localField :'_id',
    foreignField:'subscriber'
})

const Subscriber = mongoose.model('Subscriber',subscriberSchema)


module.exports = Subscriber