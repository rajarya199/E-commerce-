import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { FaTrash,FaEdit} from 'react-icons/fa';
import { API, IMG_URL } from '../config';
import { isAuthenticated } from '../auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const Product = () => {
    const{token}=isAuthenticated()
    const[products,setProducts]=useState([])
    useEffect(()=>{
        axios.get(`${API}/productlist`)
        .then(res=>{
         setProducts(res.data)
        })
        .catch(err=>console.log(err))
    },[])

     //delete product 
     const deleteProduct=(id)=>{
        const confirmed=window.confirm('Are you sure want to delete this product ?')
        if(confirmed){
            axios.delete(`${API}/deleteproduct/${id}`,{
               headers:{
                Authorization:`Bearer ${token}`
               } 
            })
            .then(res=>{
                toast.success('Product deleted')
                setProducts(products.filter((p)=>p._id!==id))
            })
            .catch(err=>{
                toast.error('Failed to delete')
            })

        }
    }
  return (
    <>
    <ToastContainer theme='colored' position='top-center'/>


<div className="container mx-auto px-4">
  <div className="flex justify-center">
    <div className="w-full max-w-7xl shadow-lg rounded-lg overflow-x-auto bg-vnbg-100 border border-vnbrd-100">
      <table className="min-w-full table-auto border-collapse border border-vnbrd-100 text-vntx-400">
        <thead className="bg-vninpl-100">
          <tr>
            {[
              'Product Name',
              'Price',
              'Stock Quantity',
              'Product Description',
              'Image',
              'Category',
              'Action',
            ].map((header) => (
              <th
                key={header}
                className="border border-vnbrd-100 px-4 py-2 text-left font-semibold text-vninp-100"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {products &&
            products.map((p, i) => (
              <tr
                key={p._id}
                className={i % 2 === 0 ? 'bg-vnbg-100' : 'bg-vninp-100'}
              >
                <td className="border border-vnbrd-100 px-4 py-2">{p.product_name}</td>
                <td className="border border-vnbrd-100 px-4 py-2">Rs. {p.product_price}</td>
                <td className="border border-vnbrd-100 px-4 py-2">{p.countInStock}</td>
                <td className="border border-vnbrd-100 px-4 py-2">{p.product_description}</td>
                <td className="border border-vnbrd-100 px-4 py-2">
                  <img
                    src={`${IMG_URL}/${p.product_image}`}
                    alt={p.product_name}
                    className="w-24 h-auto object-cover rounded"
                  />
                </td>
                <td className="border border-vnbrd-100 px-4 py-2">
                    {p.category?.category_name || 'No category'}

                </td>
                <td className="border border-vnbrd-100 px-4 py-2 gap-2 flex justify-center">
                  <Link
                    to={`/admin/updateproduct/${p._id}`}
                    className="inline-block bg-vntx-200 hover:bg-vntx-100 text-vnbg-100 p-2 rounded transition-colors duration-200"
                    aria-label={`Edit ${p.product_name}`}
                  >
                    <FaEdit />
                  </Link>
                  <button
                    onClick={() => deleteProduct(p._id)}
                    className="inline-block bg-red-700 hover:bg-red-800 text-vntx-400 p-2 rounded transition-colors duration-200"
                    aria-label={`Delete ${p.product_name}`}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  </div>
</div>


    </>
  )
}

export default Product