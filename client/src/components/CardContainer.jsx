import React,{useEffect,useState} from 'react'
import Card from './Card'
import { API } from '../config'
import axios from'axios'

const CardContainer = () => {
    const[products,setProducts]=useState([])
    useEffect(()=>{
        axios.get(`${API}/productlist`)
        .then(res=>setProducts(res.data))
        .catch(err=>console.log(err))
    },[])
  return (
    <>
    <div className="container-fluid">  
    <div className="row row-cols-1 row-cols-md-4 g-4">
    {products && products.slice(0,8).map((item,i)=>(
       <Card data={item} key={i}/>
    ))}
 
  </div>
  </div>
  </>
  )
}

export default CardContainer