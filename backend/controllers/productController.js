const Product=require('../models/productModel')

//to insert product
exports.postProduct=async(req,res)=>{
    let product= new Product({
       product_name:req.body.product_name,
       product_price:req.body.product_price,
       countInStock:req.body.countInStock,
       product_description:req.body.product_description,
       product_image:req.file.path, 
       category:req.body.category 
   })
    product= await product.save()
   if(!product){
      return res.status(400).json({error:'something went wrong'})
   }
    res.send(product)
}

//to show all the products
exports.productList=async(req,res)=>{
    const products = await Product.find().populate('category', 'category_name');

    if(!products){
        return res.status(400).json({error:'something went wrong'})
     }
      res.send(products)
}

exports.productDetails=async(req,res)=>{
    //Product.populate() to see another linked table data
    const product=await Product.findById(req.params.id)
    .populate('category','category_name') //(table linked ref valve
    if(!product){
       return res.status(400).json({error:'something went wrong'})
    }
     res.send(product) 
 }

 //to update product
exports.updateProduct=async(req,res)=>{
    const product=await Product.findByIdAndUpdate(
       req.params.id,
       {
          product_name:req.body.product_name,
          product_price:req.body.product_price,
          countInStock:req.body.countInStock,
          product_description:req.body.product_description,
          product_image:req.file.path,
          category:req.body.category  
       },
       {new:true}
    )
    if(!product){
       return res.status(400).json({error:'something went wrong'})
    }
     res.send(product) 
 }

 exports.deleteProduct=(req,res)=>{
    Product.findByIdAndDelete(req.params.id)
    .then(product=>{
        if(!product){
            return res.status(404 ).json({error:'products with that id is not found'})
        }
        else{
            return res.status(200).json({message:'product deleted'})
        }
    })
    .catch(err=>{
        return res.status(400).json({error:err})
    })
 }