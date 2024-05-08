const express=require('express')
const app=express()
require('dotenv').config()
const morgan=require('morgan')
require('./db/connection') 
const bodyParser=require('body-parser')
const userRoute=require('./routes/userRoute')
const categoryRoute=require('./routes/categoryRoute')

//middleware
app.use(morgan('dev'))
app.use(bodyParser.json())

//routes
app.use('/api',categoryRoute)
app.use('/api',userRoute)



const port=process.env.PORT || 5000
app.listen(port,()=>{
    console.log(`server started on port ${port}`)
})
