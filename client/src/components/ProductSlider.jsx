import  { useEffect, useState } from 'react'
import { ProductSlide } from './ProductSlide'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'


export const ProductSlider = ({
  products
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [direction, setDirection] = useState('right')
  const goToPrevious = () => {
    if (isTransitioning) return
    setDirection('left')
    setIsTransitioning(true)
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? products.length - 1 : prevIndex - 1,
    )
  }
  const goToNext = () => {
    if (isTransitioning) return
    setDirection('right')
    setIsTransitioning(true)
    setCurrentIndex((prevIndex) =>
      prevIndex === products.length - 1 ? 0 : prevIndex + 1,
    )
  }
  const handleTransitionEnd = () => {
    setIsTransitioning(false)
  }
  // Auto advance slides
  useEffect(() => {
    const timer = setTimeout(() => {
      goToNext()
    }, 6000)
    return () => clearTimeout(timer)
  }, [currentIndex])
  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#121212]">
      {/* Vintage texture overlay */}
      <div className="absolute inset-0 z-10 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]"></div>
      {/* Vignette effect */}
      <div
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, transparent 50%, rgba(0,0,0,0.6) 100%)',
        }}
      ></div>
      <div className="relative w-full h-full z-0">
        {products.map((product, index) => (
          <ProductSlide
            key={product.id}
            product={product}
            isActive={index === currentIndex}
            direction={direction}
            isTransitioning={
              isTransitioning &&
              (index === currentIndex ||
                (direction === 'right' &&
                  index ===
                    (currentIndex === 0
                      ? products.length - 1
                      : currentIndex - 1)) ||
                (direction === 'left' &&
                  index ===
                    (currentIndex === products.length - 1
                      ? 0
                      : currentIndex + 1)))
            }
            onTransitionEnd={
              index === currentIndex ? handleTransitionEnd : undefined
            }
          />
        ))}
      </div>
      {/* Navigation buttons */}
      <button
        onClick={goToPrevious}
        className="absolute left-5 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center border border-amber-700/30 text-amber-100/80 transition-all hover:bg-black/50 hover:text-amber-100"
        aria-label="Previous product"
      >
        <ChevronLeftIcon size={24} />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-5 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center border border-amber-700/30 text-amber-100/80 transition-all hover:bg-black/50 hover:text-amber-100"
        aria-label="Next product"
      >
        <ChevronRightIcon size={24} />
      </button>
      {/* Pagination dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-3">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (isTransitioning) return
              setDirection(index > currentIndex ? 'right' : 'left')
              setIsTransitioning(true)
              setCurrentIndex(index)
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'w-6 bg-amber-500' : 'bg-amber-700/50'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
