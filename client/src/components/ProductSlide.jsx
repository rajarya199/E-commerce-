import React from 'react'

export const ProductSlide = ({
  product,
  isActive,
  direction,
  isTransitioning,
  onTransitionEnd,
}) => {
  const getPositionClasses = () => {
    if (!isActive && !isTransitioning) {
      return 'translate-x-full opacity-0'
    }
    if (isTransitioning) {
      if (isActive) {
        return direction === 'right'
          ? 'translate-x-0 opacity-100'
          : 'translate-x-0 opacity-100'
      } else {
        return direction === 'right'
          ? '-translate-x-full opacity-0'
          : 'translate-x-full opacity-0'
      }
    }
    return 'translate-x-0 opacity-100'
  }
  return (
    <div
      className={`absolute inset-0 w-full h-full transition-transform duration-1000 ease-in-out ${getPositionClasses()}`}
      onTransitionEnd={onTransitionEnd}
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={product.image}
          alt=""
          className="w-full h-full object-cover object-center filter brightness-50 sepia-[0.15]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
      </div>
      {/* Content container */}
      <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16 lg:px-24 max-w-7xl mx-auto">
        <div className="w-full md:w-2/3 lg:w-1/2">
          {/* Vintage label */}
          <div className="inline-block mb-4 px-3 py-1 bg-amber-900/70 text-amber-200 text-xs tracking-widest uppercase border-l-2 border-amber-500">
            Featured Collection
          </div>
          {/* Product name with vintage styling */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-amber-100 mb-4 tracking-tighter leading-tight">
            {product.name}
          </h1>
          {/* Description */}
          <p className="text-lg text-amber-200/80 mb-6 font-light max-w-lg">
            {product.description}
          </p>
          {/* Price tag with vintage styling */}
          <div className="inline-flex items-center mb-8 bg-black/40 backdrop-blur-sm border border-amber-700/30 px-4 py-2">
            <span className="text-amber-500 text-sm mr-2">Price</span>
            <span className="text-amber-100 text-2xl font-serif">
              ${product.price.toFixed(2)}
            </span>
          </div>
          {/* CTA button */}
          <div>
            <button className="bg-amber-800 hover:bg-amber-700 text-amber-100 px-8 py-3 text-lg transition-all duration-300 border-b-2 border-amber-600 hover:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50 group">
              Shop Now
              <span className="inline-block ml-2 transform group-hover:translate-x-1 transition-transform duration-200">
                →
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
