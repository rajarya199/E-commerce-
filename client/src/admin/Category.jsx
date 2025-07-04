import React ,{useState,useEffect} from 'react'
import axios from 'axios'
import { API } from '../config';
import { FaTrash} from 'react-icons/fa';

const Category = () => {
    const[category,setCategory]=useState([])
    useEffect(()=>{
        axios.get(`${API}/categorylist`)
        .then(res=>{
            setCategory(res.data)

        })
        .catch(err=>console.log(err))
    },[])
  return (
    <>

<div className="container mx-auto px-4">
  <div className="flex justify-center">
    <div className="w-full max-w-md shadow-lg rounded-lg overflow-hidden bg-vnbg-100 border border-vnbrd-100">
      <table className="min-w-full table-auto border-collapse border border-vnbrd-100 text-vntx-400">
        <thead className="bg-vninpl-100">
          <tr>
            <th className="border border-vnbrd-100 px-4 py-2 text-left font-semibold text-gray-800">
              Category Name
            </th>
            <th className="border border-vnbrd-100 px-4 py-2 text-left font-semibold text-gray-800">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {category &&
            category.map((c, i) => (
              <tr
                key={i}
                className={i % 2 === 0 ? 'bg-vnbg-100' : 'bg-vninp-100'}
              >
                <td className="border border-vnbrd-100 px-4 py-2">{c.category_name}</td>
                <td className="border border-vnbrd-100 px-4 py-2">
                  <button
                    className="bg-red-700 hover:bg-red-800 text-vntx-400 p-2 rounded transition-colors duration-200"
                    aria-label={`Delete category ${c.category_name}`}
                    // onClick={() => /* your delete handler here */}
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

export default Category