import React from 'react'

const Sidebar = () => {
  return (
  <>
  <h2 className="text-gray-300 mt-5 text-xl font-semibold">Our Promotions</h2>

  <h5 className="mt-4 mb-2 text-lg font-semibold text-white">Categories</h5>

  {/* Categories Checkboxes */}
  <div className="space-y-2">
    {['Mobile', 'Laptop', 'Fashion'].map((category, idx) => {
      const id = `category-${idx}`
      return (
        <div key={id} className="flex items-center">
          <input
            type="checkbox"
            id={id}
            className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
          />
          <label htmlFor={id} className="ml-2 block text-gray-300 cursor-pointer">
            {category}
          </label>
        </div>
      )
    })}
  </div>

  <h5 className="mt-6 mb-2 text-lg font-semibold text-white">Price Range</h5>

  {/* Price Range Radios */}
  <div className="space-y-2">
    {[
      { label: 'All', value: 'all' },
      { label: '500-1000', value: '500-1000' },
      { label: '5000-10000', value: '5000-10000' },
      { label: '10000-50000', value: '10000-50000' },
    ].map(({ label, value }, idx) => {
      const id = `price-${idx}`
      return (
        <div key={id} className="flex items-center">
          <input
            type="radio"
            id={id}
            name="priceRange"
            value={value}
            className="h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500"
          />
          <label htmlFor={id} className="ml-2 block text-gray-300 cursor-pointer">
            {label}
          </label>
        </div>
      )
    })}
  </div>
</>

  )
}

export default Sidebar