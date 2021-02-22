const express = require('express');
const router = express.Router();
const Blog = require('../models/blog')
const mail = require('../functions/mailer')
const auth = require('../middleware/auth')
require('../db/mongoose')

router.post('/create',auth,(req,res) =>{

    const blog = new Blog(req.body) 
    blog.author = req.author._id
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
  
  router.get('/',(req,res) => {
    
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
      const blogs = await Blog.find({})
      var matchedBlogs =[]
      var blog
      for (blog in blogs) {
        console.log(blogs[blog])
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
  
  router.patch('/:id',auth, async (req,res) => {
    const id = req.params.id
    const updates = Object.keys(req.body)
    const allowed = ['categories','link','body']
    const isValidOperation= updates.every((update) => allowed.includes(update))

    if(!isValidOperation) {
      return req.status(400).send({error:'Invalid updates!'})
    }

    try{
       
      const blog = await Blog.findOne({_id :id, author : req.author.id})
      if(!blog) {
        return res.status(404).send() 
       }
      updates.forEach((update) => {   
        blog[update] = req.body[update]
      })
      await blog.save()
    
      res.send(blog)

    } catch(e) {
      res.status(500)
    }

  })

  router.delete('/:id' , async(req,res) =>{
       try{
        const id = req.params.id
        console.log(id)
        const blog =  await Blog.findById(id)
      
        if(!blog) {
         return res.status(404).send() 
        }
        blog.remove()
        res.send()
       } catch(e) {
          res.status(500).send()
       }
  })


  module.exports = router