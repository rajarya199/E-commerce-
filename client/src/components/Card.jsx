import React from 'react'
import { Link } from 'react-router-dom'
import { IMG_URL } from '../config'

const Card = (props) => {
  const { _id, product_name, product_price, product_image } = props.data

  return (
    <div className="w-full  p-2"> 
      <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
        {/* Product Image */}
        <img
          src={`${IMG_URL}/${product_image}`}
          alt={product_name}
          className="w-full h-48 object-cover"
        />
        <div className="p-4 flex flex-col flex-grow">
          <h5 className="text-lg font-semibold mb-2">{product_name}</h5>
          <h5 className="text-gray-700 font-medium mb-4">Rs {product_price}</h5>
          <Link
            to={`/productdetails/${_id}`}
            className="mt-auto inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded text-center"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Card
