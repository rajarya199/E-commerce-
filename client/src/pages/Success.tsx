import React from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle } from 'lucide-react' // optional icon library

const Success = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 py-10 bg-white">
      <CheckCircle size={80} className="text-green-500 mb-6" />
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
      <p className="text-gray-600 mb-6">Thank you for your purchase. Your order has been placed successfully.</p>
      <Link
        to="/"
        className="bg-green-500 hover:bg-green-600 text-white font-medium px-6 py-2 rounded transition duration-200"
      >
        Go to Homepage
      </Link>
    </div>
  )
}

export default Success
