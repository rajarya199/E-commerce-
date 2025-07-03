import React from 'react'
import { isAuthenticated } from '../auth'
import { useNavigate } from 'react-router-dom'
import { IMG_URL } from '../config'
const ConfirmOrder = () => {
       const navigate = useNavigate()
    const cartItems = JSON.parse(localStorage.getItem('cartItems'))
    const shippingInfo = JSON.parse(localStorage.getItem('shippingInfo'))
    const { user } = isAuthenticated()
    const totalPrice = cartItems.reduce((ac, item) => (ac + item.quantity * item.price), 0)

     const proceessToPayment=()=>{
        const data={
            totalPrice
        }
        sessionStorage.setItem('orderInfo',JSON.stringify(data))
        navigate('/payment')
    }
  return (
    <div>
      <div className="container mx-auto my-20 px-4">
  <div className="flex flex-wrap justify-evenly mb-12 gap-8">
    {/* Shipping Info and Cart Items */}
    <div className="w-full lg:w-8/12 shadow-lg rounded-lg p-6 bg-white">
      <h2 className="text-center text-2xl font-semibold mb-8">Shipping Info</h2>

      <div className="max-w-md mx-auto space-y-4 mb-8">
        <div>
          <b>Name</b>: <span className="text-gray-500 ml-2">{user.name}</span>
        </div>
        <div>
          <b>Email</b>: <span className="text-gray-500 ml-2">{user.email}</span>
        </div>
        <div>
          <b>City</b>: <span className="text-gray-500 ml-2">{shippingInfo.city}</span>
        </div>
        <div>
          <b>Phone Number</b>: <span className="text-gray-500 ml-2">{shippingInfo.phone}</span>
        </div>
        <div>
          <b>Country</b>: <span className="text-gray-500 ml-2">{shippingInfo.country}</span>
        </div>
        <div>
          <b>Shipping Address</b>:
          <span className="text-gray-500 ml-2">
            {shippingInfo.shippingAddress1}, {shippingInfo.shippingAddress2}
          </span>
        </div>
        <div>
          <b>Zip</b>: <span className="text-gray-500 ml-2">{shippingInfo.zip}</span>
        </div>
      </div>

      <hr className="my-6 border-gray-300" />

      <h2 className="text-center text-2xl font-semibold mb-6">Your Cart Items</h2>

      {cartItems.map((item, i) => (
        <div key={i}>
          <hr className="border-gray-300 mb-4" />
          <div className="flex items-center space-x-6">
            <div className="w-1/4">
              <img
                src={`${IMG_URL}/${item.image}`}
                alt={item.name}
                className="w-full h-auto object-cover rounded"
                width={150}
              />
            </div>
            <div className="w-1/4">
              <p className="text-gray-500 text-lg">{item.name}</p>
            </div>
            <div className="w-1/4">
              <p className="text-yellow-500 text-lg font-semibold">
                Rs.{item.price} x {item.quantity} ={' '}
                <span className="text-gray-900 font-bold">
                  Rs.{item.price * item.quantity}
                </span>
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Order Summary */}
    <div className="w-full lg:w-3/12 shadow-lg rounded-lg p-6 bg-white h-fit">
      <h4 className="text-xl font-semibold mb-4">Order Summary</h4>
      <hr className="mb-4 border-gray-300" />
      <p className="mb-2">
        SubTotal:{' '}
        <span className="font-semibold">
          {cartItems.reduce((ac, item) => ac + Number(item.quantity), 0)} (Units)
        </span>
      </p>
      <p className="mb-6">
        TotalPrice: Rs.<span className="font-semibold">{totalPrice}</span>
      </p>
      <hr className="mb-6 border-gray-300" />
      <button
        className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 rounded transition-colors duration-200"
        onClick={proceessToPayment}
      >
        Proceed to Payment
      </button>
    </div>
  </div>
</div>

    </div>
  )
}

export default ConfirmOrder