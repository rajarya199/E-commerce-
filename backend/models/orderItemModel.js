const mongoose=require('mongoose')
const {ObjectId}=mongoose.Schema
//orderitem--  total no of order and order's product id
const orderItemSchema=new mongoose.Schema({
    quantity:{
        type:Number,
        require:true
    },
    product:{
        type:ObjectId,
        required:true,
        ref:'Product'
    }

},{timestamps:true})
module.exports=mongoose.model("OrderItem",orderItemSchema)