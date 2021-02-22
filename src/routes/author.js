const express = require('express')
const router = new express.Router()
const Author = require('../models/author')

router.post('/new',async (req,res) =>{

    const author = new Author(req.body)
    try{
        await author.save()
        res.send(author)
    } catch(e) {
        res.status(500).send(e)
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

module.exports = router