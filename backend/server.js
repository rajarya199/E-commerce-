const express=require('express')
const app=express()
require('dotenv').config()
const morgan=require('morgan')
require('./db/connection') 
const bodyParser=require('body-parser')
const userRoute=require('./routes/userRoute')
const orderRoute=require('./routes/orderRoute')

const categoryRoute=require('./routes/categoryRoute')
const productRoute=require('./routes/productRoute')
const paymentRoute=require('./routes/paymentRoute')
const cors=require('cors')
//middleware
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cors())
app.use('/public/uploads',express.static('public/uploads'))

//routes
app.use('/api',categoryRoute)
app.use('/api',userRoute)
app.use('/api',productRoute)
app.use('/api',orderRoute)
app.use('/api',paymentRoute)


const port=process.env.PORT || 5000
app.listen(port,()=>{
    console.log(`server started on port ${port}`)
})
