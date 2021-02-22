const express = require('express')
const router = new express.Router()
const Feedback = require('../models/feedback')
const auth = require('../middleware/subscriber_auth')

router.post('/:id',auth,async (req,res) =>{
    try{
        const blogid = req.params.id
        const feedback = new Feedback({
        subscriber:req.subscriber._id,
        blog:blogid,
        feedback:req.body.feedback
       })
       
      await feedback.populate('blog').execPopulate()
       console.log(feedback.blog)
       await feedback.save()
       res.send(feedback)
    } catch(e) {
        res.status(500).send()
    }
})

module.exports = router