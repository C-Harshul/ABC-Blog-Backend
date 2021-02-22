const jwt = require('jsonwebtoken')
const Author = require('../models/author')

const auth = async(req,res,next) => {
    try{

       const token = req.header('Authorization').replace('Bearer ', '')
       console.log(token)
       const decoded = jwt.verify(token,'Authortoken')
       const author = await Author.findOne({_id:decoded._id,'tokens.token':token})
       if(!author) {
           throw new Error()
       }
       req.author = author
       req.token = token
       next()
    } catch(e) {
        console.log(e)
        res.status(401).send({error : 'PLease authenticate'})
    }
} 

module.exports = auth