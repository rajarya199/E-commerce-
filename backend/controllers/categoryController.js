const Category=require('../models/categoryModel')

//insert category
exports.postCategory=async(req,res)=>{
    let category= new Category({
        category_name:req.body.category_name

    })
    category=await category.save()
    if(!category){
        return res.status(400).json({error:"something went wrong"})
    }
    res.send(category)
}
// to retrive all data
exports.categoryList=async(req,res)=>{
    const category= await Category.find()
    if(!category){
        return res.status(400).json({error:"something went wrong"})
    }
    res.send(category)
}