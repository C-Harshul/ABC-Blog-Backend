const mongoose = require('mongoose')
const validator = require('validator')

const Subscriber = mongoose.model('Subscriber',{
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
    timeStamp:{
        type:String,
        require:true,
    }
})


module.exports = Subscriber