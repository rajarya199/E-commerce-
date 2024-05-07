const mongoose=require('mongoose')

const categorySchema= new mongoose.Schema({
    category_name:{
        type:String, 
        required:true,
        unique:true,
        trim:true, //remove white-space

    }
},{timestamps:true})
module.exports=mongoose.model('Category',categorySchema) 