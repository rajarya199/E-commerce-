import React,{useState,useEffect} from 'react'
import Card from '../components/Card'
import Sidebar from '../components/Sidebar'
import axios from 'axios'
import { API } from '../config'
import ProductsCard from '../components/ProductsCard'

const Products = () => {
     const[products,setProducts]=useState([])
  const [limit,setLimit]=useState(12)
   useEffect(() => {
    axios.get(`${API}/productlist`)
      .then(res => {
        setProducts(res.data)
      })
      .catch(err => console.log(err))
  }, [])
  return (
    <>
      <div className="w-full ">
  <div className="flex flex-wrap justify-evenly">
    {/* Sidebar */}
    <div className="w-full md:w-1/4 px-4">
      <Sidebar />
    </div>

    {/* Main content */}
    <div className="w-full md:w-3/4 px-4 mt-5">
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products &&
            products.map((product, i) => (
              <ProductsCard key={i} data={product} />
            ))}
        </div>
      </div>
    </div>
  </div>
</div>

    </>
  )
}

export default Products