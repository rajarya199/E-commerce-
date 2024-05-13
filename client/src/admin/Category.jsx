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
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-5 shadow">
    <table className="table">
  <thead>
             <tr >
             <th scope="col">Category Name</th>
             <th scope="col">Action</th>
           </tr>
  </thead>
  <tbody>
            {category && category.map((c,i)=>(
            <tr key={i}>
            <td>{c.category_name}</td>
            <td><button className='btn btn-danger'><FaTrash/></button></td>
          
          </tr>
        )
        )}
   

  </tbody>
</table>
                    </div>
                </div>
            </div>
    </>
  )
}

export default Category