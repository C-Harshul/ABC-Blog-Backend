const express = require('express');
const { ObjectID } = require('mongodb');
const router = express.Router();
const Blog = require('../models/blog')
const mail = require('../functions/mailer')
require('../db/mongoose')

router.post('/create',(req,res) =>{

    const blog = new Blog(req.body) 
    blog.timeStamp = new ObjectID().getTimestamp()
    blog.save().then((blog)=>{
      const mailMessage = "Checkout our new blog at " +blog.link 
      mail(mailMessage,(error,result) =>{
          if(error) {
              res.status(500).send(error)
          } else {
              res.send(result)
          }
      }) 
    }).catch((e)=>{
      res.status(500).send(e)
    })
  })
  
  router.get('/get',(req,res) => {
    
    const filter = req.query
    
    Blog.find(filter).then((Blogs) =>{
      if(Blogs.length == 0){
        res.status(404).send()
      } else {

        res.send(Blogs)
      }
    }).catch((e) =>{
      res.status(500).send(e)
    })
  })
  



  module.exports = router