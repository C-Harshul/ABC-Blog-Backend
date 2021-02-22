const express = require('express')
const router = new express.Router()
const Author = require('../models/author')
const auth = require('../middleware/auth')

router.post('/new',async (req,res) =>{

    const author = new Author(req.body)
    try{
        const token = await author.generateAuthToken()
        await author.save()
        res.send({author,token})
    } catch(e) {
        res.status(500).send(e)
    }

})

router.post('/login', async(req,res) =>{
    try {
        const loginCreds = req.body
        //console.log(loginCreds)
        const author = await Author.findCredentials(loginCreds.email,loginCreds.password)
        
        if(!author){
          return res.status(404).send({error : "Authentication failed"})
         }
       const token = await author.generateAuthToken()
       res.send({author,token})
    
    } catch(e) {
       res.status(400).send()  
    }
})

router.get('/logout',auth, async(req,res) => {
    const currentToken = req.token
    const author = req.author
    const activeTokens = author.tokens
    const newTokens = []
    //console.log(activeTokens)
    try {
        activeTokens.forEach((token) => {
            if( token.token !== currentToken){

                newTokens.push(token)
            }
        })
        author.tokens = newTokens
        console.log(author)
        await author.save()
        res.send()
    } catch(e) {
       res.status(500).send()
    }
})

router.get('/logoutAll',auth,async(req,res) =>{
    try{
        req.author.tokens =[]
         await req.author.save()
        res.send()  
    } catch(e) {
        res.status(500).send(e)
    }
})

router.get('/profile',auth,async(req,res) => {
    try{

        const author = await Author.findOne({_id:req.author._id})
        if(!author) {
           return res.status(404).send()
        }
        await author.populate({'path':'blogs'}).execPopulate()
        res.send({'About Me': author,Blogs:author.blogs})
    } catch(e) {
        res.status(500).send()
    }
})

router.patch('/me',auth,async (req,res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','email','password']
    const isValid = updates.every((update) => allowedUpdates.includes(update))

    if(!isValid) {
        return res.status(400).send({error : 'Invalid update request'})
    }
    
    try { 
        const _id = req.author._id
        const author = await Author.findById(_id)
        if(!author) {
        return res.status(404).send()
      } 
      updates.forEach((update) => {
          author[update] = req.body[update]
      })    
      await author.save()
      res.send(author)
    } catch(e) {
        res.status(500).send()
    }
    

})

router.delete('/me', auth,async (req,res) =>{
    try{
      const author = await Author.findByIdAndDelete(req.author._id)
      if(!author) {
         return res.status(404).send()
      }
      res.send(author)
    } catch(e) {
      res.status(500).send()  
    }
})

module.exports = router