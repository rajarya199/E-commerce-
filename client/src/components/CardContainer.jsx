import React, { useEffect, useState } from 'react'
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products &&
          products.slice(0, 8).map((item, i) => (
            <Card data={item} key={i} />
          ))}
      </div>
    </div>
  )
}

export default CardContainer
