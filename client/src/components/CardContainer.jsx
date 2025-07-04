import  { useEffect, useState } from 'react'
import Card from './Card'
import { API } from '../config'
import axios from 'axios'

const CardContainer = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    axios
      .get(`${API}/productlist`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err))
  }, [])

  return (
    <section className="w-full bg-[#121212] py-16">
{/* vintage texture overflow */}

            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="mb-12 text-center">
          <div className="inline-block px-3 py-1 bg-amber-900/70 text-amber-200 text-xs tracking-widest uppercase border-l-2 border-amber-500 mb-3">
            Our Collection
          </div>
          <h2 className="text-3xl md:text-4xl font-serif text-amber-100 tracking-tighter">
            Products
          </h2>
          <div className="w-24 h-px bg-amber-700/50 mx-auto mt-4"></div>
        </div>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {products &&
          products.slice(0, 8).map((item, i) => (
            <Card data={item} key={i} />
          ))}
        </div>
        </div>

 
    </section>
  
  )
}

export default CardContainer
