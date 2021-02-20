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

  router.get('/getCategory/:category',async (req,res) => {
    const category = req.params.category
    console.log(category)
    try{
      const blogs = await Blog.find()
      var matchedBlogs =[]
      var blog
      for (blog in blogs) {
        if(blogs[blog].categories.includes(category)){
          console.log(blogs[blog])
          matchedBlogs.push(blogs[blog])
        }
      }
      res.send(matchedBlogs)
    } catch(e) {
      res.status(500).send()
    }
   
  })
  



  module.exports = router