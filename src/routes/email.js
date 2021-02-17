const express = require('express')
const router = new express.Router()
const mail = require('../functions/mailer')


  router.post('/',async (req,res)=>{
    
    const message = req.body.message
    mail(message ,(error,result) => {
       if(!error){
           res.send(result)
       } else {
           res.status(500).send(error)
       }
    })  
    
  })

  
  module.exports = router
  