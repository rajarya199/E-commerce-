const express=require('express')
const app=express()
require('dotenv').config

app.use('/',(req,res)=>{
    res.json({message:'This is a express server class'})
})

const port=process.env.PORT || 5000
app.listen(port,()=>{
    console.log(`server started on port ${port}`)
})