import React, { useState, useEffect,Fragment } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { IMG_URL } from '../config';
import { useNavigate } from 'react-router-dom';
const Cart = () => {
      const navigate=useNavigate()
    const [products, setProducts] = useState([])
    //load cart data from localstorage
        useEffect(() => {
        const cartData = localStorage.getItem('cartItems')
        const cartItems=JSON.parse(cartData)
        if(cartItems && cartItems.length >0){
            setProducts(cartItems)
        }
        else{
            setProducts([])
        }
    }, [])
       //decrease quantity
    const decreaseQty=id=>{
        const updateProducts=products.map(item=>{
            if(item.id===id && item.quantity>1){
                return {...item,quantity:item.quantity-1}
            }
            return item
        })
        setProducts(updateProducts)
        localStorage.setItem('cartItems',JSON.stringify(updateProducts))
    } 
      //increase quantity
    const increaseQty=id=>{
        const updateProducts=products.map(item=>{
            if(item.id===id && item.quantity<item.countInStock){
                return {...item,quantity:item.quantity+1}
            }
            return item
        })
        setProducts(updateProducts)
        localStorage.setItem('cartItems',JSON.stringify(updateProducts))

    } 
      //remove from cart 
    const removeCartHandler=(id,name)=>{
        const cartItems=JSON.parse(localStorage.getItem('cartItems'))
        const filterCart=cartItems.filter(item=>item.id!==id)
        localStorage.setItem('cartItems',JSON.stringify(filterCart))
        setProducts(filterCart)
        toast.success(`${name} is removed from the cart`)
    }
        // shipping handler
     const shippingHandler=()=>{
       navigate('/shipping')
    }
  return (
        <>
            <ToastContainer theme='colored' position='top-center' />
           <div className="container mx-auto px-4">
      <div className="flex flex-wrap justify-between my-20">
        {products && products.length === 0 ? (
          <h2 className="w-full text-center text-red-400 mt-3 text-2xl font-semibold">
            Your Cart is Empty
          </h2>
        ) : (
          <>
            <h2 className="w-full text-center text-gray-200 mt-3 text-2xl font-semibold">
              Your Cart Items
            </h2>

            {/* Cart Items List */}
            <div className="w-full md:w-2/3 shadow-lg rounded-lg overflow-hidden mt-6 text-white">
              {products &&
                products.map((item, i) => (
                  <Fragment key={i}>
                    <hr className="border-gray-300" />
                    <div className="flex items-center p-4 space-x-4">
                      {/* Image */}
                      <div className="w-1/4">
                        <img
                          src={`${IMG_URL}/${item.image}`}
                          alt={item.name}
                          className="w-full h-auto object-cover rounded"
                          width={150}
                        />
                      </div>

                      {/* Name */}
                      <div className="w-1/4">
                        <span className="font-bold text-lg">{item.name}</span>
                      </div>

                      {/* Price */}
                      <div className="w-1/6">
                        <span className="text-yellow-500 font-semibold text-lg">
                          Rs.{item.price}
                        </span>
                      </div>

                      {/* Quantity controls */}
                      <div className="w-1/3">
                        <div className="flex items-center space-x-3">
                          <button
                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                            onClick={() => decreaseQty(item.id)}
                          >
                            -
                          </button>
                          <input
                            type="number"
                            name="qty"
                            value={item.quantity}
                            readOnly
                            className="w-16 text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                          />
                          <button
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
                            onClick={() => increaseQty(item.id)}
                          >
                            +
                          </button>
                          <button
                            className="ml-4 bg-red-600 hover:bg-red-700 text-white p-2 rounded"
                            onClick={() => removeCartHandler(item.id, item.name)}
                            aria-label={`Remove ${item.name} from cart`}
                          >
                            <i className="fa fa-trash" aria-hidden="true"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    <hr className="border-gray-300" />
                  </Fragment>
                ))}
            </div>

            {/* Cart Summary */}
            <div className="w-full md:w-1/3 mt-6 md:mt-0 px-4">
              <div className="shadow-lg p-6 rounded-lg bg-white ">
                <h5 className="text-xl font-semibold mb-4">Cart Summary</h5>
                <hr className="mb-4 border-gray-300" />
                <p className="mb-2">
                  <b>Units:</b>{' '}
                  {products.reduce((acc, item) => acc + Number(item.quantity), 0)}
                </p>
                <p className="mb-4">
                  <b>Total:</b>{' '}
                  Rs.
                  {products.reduce(
                    (acc, item) => acc + item.quantity * item.price,
                    0
                  )}
                </p>
                <button
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 rounded transition-colors duration-200"
                  onClick={shippingHandler}
                >
                  CheckOut
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>

        </>
  )
}

export default Cart