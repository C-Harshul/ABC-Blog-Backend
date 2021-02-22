const express = require('express')
const router = express.Router()
const Subscriber = require('../models/subscribers')
const auth = require('../middleware/subscriber_auth')

router.post('/new',async (req,res) => {
  const subscriber = new Subscriber(req.body)
  try{
    await subscriber.save()
    const token = await subscriber.generateAuthToken()
    res.send({subscriber,token})
  } catch(e) {
      res.status(500).send(e)
  }
})

router.post('/login',async(req,res) =>{
  try{
     
    const subscriber = await Subscriber.findCredentials(req.body.email,req.body.password)
    if(!subscriber) {
        res.status(404).send({error: 'Authentication failed'})
    }
    const token = await subscriber.generateAuthToken()
    res.send({subscriber,token})
  } catch(e) {
     res.status.send()
  }
})

router.get('/logout',auth,async(req,res) => {
   try{
    const subscriber = req.subscriber
    const tokens = subscriber.tokens.filter((token) =>{
        return token.token != req.token
    })
    subscriber.tokens = tokens
    await subscriber.save()
    res.send()
   } catch(e) {
     res.status(500).send()    
   }
})

module.exports = router