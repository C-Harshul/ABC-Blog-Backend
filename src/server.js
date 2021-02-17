const express = require('express')
const morgan = require('morgan')

require('./db/mongoose')
const blogRoutes = require('./routes/blog')
const emailRoutes = require('./routes/email')

const app = express()
const port= process.env.PORT||3000

app.use(express.json())
app.use(morgan('dev'))

app.use('/blog',blogRoutes)
app.use('/email',emailRoutes)

app.listen(port,() =>{
  console.log('Server on port:' + port)
})