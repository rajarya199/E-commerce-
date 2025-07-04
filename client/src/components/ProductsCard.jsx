import React from 'react'
import { ShoppingCartIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { IMG_URL } from '../config'
const ProductsCard = (props) => {
  const { _id, product_name, product_price, product_image,product_description } = props.data

  return (
    <div>
           <div className="bg-black/30 border border-amber-900/30 group relative overflow-hidden transition-all duration-300 hover:border-amber-700/50">
      <div className="relative aspect-square overflow-hidden">
        <img
            src={`${IMG_URL}/${product_image}`}
                    alt={product_name}
          className="w-full h-full object-cover object-center transition-transform duration-700 filter brightness-90 sepia-[0.15] group-hover:scale-105 group-hover:brightness-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        {/* Quick add button */}
        <button
          className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-amber-800 hover:bg-amber-700 text-amber-100 px-4 py-2 flex items-center space-x-2 transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 border-b-2 border-amber-600"
          aria-label="Add to cart"
        >
          <ShoppingCartIcon size={16} />
          <span>Add to Cart</span>
        </button>
      </div>
      {/* Product info */}
      <div className="p-4">
        <h3 className="text-amber-100 font-serif text-lg mb-1">
          {product_name}
        </h3>
        <p className="text-amber-200/70 text-sm line-clamp-2 mb-2 h-10">
          {product_description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-amber-500 font-serif">
            ${product_price.toFixed(2)}
          </span>
          <Link
                      to={`/productdetails/${_id}`}
 className=" bg-amber-800 hover:bg-amber-700 text-amber-100 px-6 py-2 rounded">
            View
          </Link>
        </div>
      </div>
    </div>
    </div>
  )
}

export default ProductsCard