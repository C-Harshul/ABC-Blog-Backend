const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const subscriberSchema = mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
        require:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Enter a valid mail ID')
            }
        }
    },
    password: {
        type:String,
        required:true
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

subscriberSchema.virtual('feedbacks',{
    ref:'Feedback',
    localField :'_id',
    foreignField:'subscriber'
})

subscriberSchema.methods.generateAuthToken = async function () {

    const subscriber = this
    console.log(subscriber)
    const token = jwt.sign({_id:subscriber._id.toString()},'SubscriberToken')
    console.log(token)
    subscriber.tokens = subscriber.tokens.concat({token})
    console.log(subscriber)
    await subscriber.save()

    return token
  
}

subscriberSchema.statics.findCredentials =async(email,password) => {
   
       const subscriber = await Subscriber.findOne({email})
       if(!subscriber) {
           throw new Error('Invalid MailId')
       }  
      const isMatch = await bcrypt.compare(password,subscriber.password)
      if(!isMatch) {
          throw new Error('Incorrect password')
      }
      return subscriber
}

subscriberSchema.pre('save',async function(next) {
 
    const subscriber = this
    if(subscriber.isModified('password')){
      subscriber.password = await bcrypt.hash(subscriber.password,8)
    }
    next()

})

const Subscriber = mongoose.model('Subscriber',subscriberSchema)


module.exports = Subscriber