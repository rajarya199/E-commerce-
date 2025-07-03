import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { API, IMG_URL } from '../config'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const ProductDetails = () => {
    const[product,setProduct]=useState({})
    const params=useParams()

    useEffect(()=>{
        const id=params.productId
        axios.get(`${API}/productdetails/${id}`)
        .then(res=>{
            setProduct(res.data)
        })
        .catch(err=>console.log(err))
    },[])
      // add to cart 
      const addToCart=()=>{
        const cartItems=JSON.parse(localStorage.getItem('cartItems')) || []
        const productItem={
            id:product._id,
            name:product.product_name,
            price:product.product_price,
            image:product.product_image,
            category:product.category,
            description:product.product_description,
            countInStock:product.countInStock,
            quantity:1
        }
        const existingItem=cartItems.find(item=>item.id===product._id)
        if(existingItem){
            toast.error('Product already in the cart')
        }
        else{
            cartItems.push(productItem)
            localStorage.setItem('cartItems',JSON.stringify(cartItems))
            toast.success(`${productItem.name} is added to cart`)
        }
    }
  return (
    <>

<ToastContainer theme='colored' position='top-center'/>
  <div className="container mx-auto shadow-lg p-5 my-10">
  <div className="flex flex-wrap justify-between">
    <div className="w-full md:w-5/12 mb-6 md:mb-0">
      <img
        src={`${IMG_URL}/${product.product_image}`}
        alt={product.product_name}
        className="w-full h-auto object-cover rounded"
      />
    </div>

    {/* Product Details */}
    <div className="w-full md:w-6/12">
      <h5 className="text-2xl font-semibold mb-3 text-white">{product.product_name}</h5>
      <h5 className="text-xl text-gray-300 mb-4">Rs.{product.product_price}</h5>
      <p className="text-gray-300 mb-8">{product.product_description}</p>

      <button
        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded transition-colors duration-200"
        onClick={addToCart}
      >
        Add to Cart
      </button>
    </div>
  </div>
</div>

    </>
  )
}

export default ProductDetails