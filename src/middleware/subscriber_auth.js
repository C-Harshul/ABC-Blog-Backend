const jwt = require('jsonwebtoken')
const Subscriber = require('../models/subscribers')

const auth = async(req,res,next)=> {
   try{
       
    const token = req.header('Authorization').replace('Bearer ','')
    console.log(token)
    const decoded = jwt.verify(token,'SubscriberToken')
    const subscriber = await Subscriber.findOne({_id:decoded._id,'tokens.token':token})
    req.subscriber = subscriber
    if(!subscriber) {
        throw new Error()
    }
    req.token = token
    next()
   } catch(e) {
       res.status(401).send({error: 'Please authenticate'})
   }
}

module.exports = auth