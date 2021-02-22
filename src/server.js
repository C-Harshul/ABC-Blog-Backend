const express = require('express')
const morgan = require('morgan')

require('./db/mongoose')
const blogRoutes = require('./routes/blog')
const authorRoutes = require('./routes/author')
const subscriberRoutes = require('./routes/subscriber')
const emailRoutes = require('./routes/email')
const feedbackRoutes = require('./routes/feedback')

const app = express()
const port= process.env.PORT||3000

app.use(express.json())
app.use(morgan('dev'))

app.use('/blog',blogRoutes)
app.use('/author',authorRoutes)
app.use('/subscriber',subscriberRoutes)
app.use('/email',emailRoutes)
app.use('/feedback',feedbackRoutes)

app.listen(port,() =>{
  console.log('Server on port:' + port)
})