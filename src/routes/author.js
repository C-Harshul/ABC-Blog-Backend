const express = require('express')
const router = new express.Router()
const Author = require('../models/author')

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
       const tokens = await author.generateAuthToken()
       res.send({author,tokens})
    
    } catch(e) {
       res.status(400).send()  
    }
})

router.get('/', async(req,res) => {
    try{
        const filter = req.query
        console.log(filter)
        const authors = await Author.find(filter)
        if(!authors) {
           return res.status(404).send()
        }
        res.send(authors)
    } catch(e) {
        res.status(500).send()
    }
})

router.patch('/:id',async (req,res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','email','password']
    const isValid = updates.every((update) => allowedUpdates.includes(update))

    if(!isValid) {
        return res.status(400).send({error : 'Invalid update request'})
    }
    
    try { 
        const _id = req.params.id
        const author = await Author.findById(_id)
        console.log(_id,author)
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

router.delete('/:id', async (req,res) =>{
    try{
      const author = await Author.findByIdAndDelete(req.params.id)
      if(!author) {
         return res.status(404).send()
      }
      res.send(author)
    } catch(e) {
      res.status(500).send()  
    }
})

module.exports = router