import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { API } from '../config'
const EmailVerify = () => {
    const params=useParams()
    const[values,setValues]=useState({
        error:'',
        success:false
    })
    const{error,success}=values
useEffect(()=>{
    const token =params.token 
    fetch(`${API}/confirmation/${token}`,{
        method:"PUT",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
            } 
    })
    .then(res=>res.json())
    .then(data=>{
        if(data.error){
            setValues({...values,error:data.error})
        }
        else{
            setValues({...values,error:'',success:true})
        }
    })
    .catch(err=>console.log(err))
},[params.token] )


 //to show error msg 
const showError = () => (
  <div
    className="bg-red-700 border border-red-500 text-red-100 text-sm font-medium rounded px-4 py-2 m-2 shadow-md"
    style={{ display: error ? 'block' : 'none' }}
    role="alert"
  >
    {error}
  </div>
);

const showSuccess = () => (
  <div
    className="bg-amber-700 border border-amber-500 text-amber-100 text-sm font-medium rounded px-4 py-2 m-2 shadow-md"
    style={{ display: success ? 'block' : 'none' }}
    role="alert"
  >
    Your account has been verified, login to continue
  </div>
);

  return (
    <>
         {showError()}
    {showSuccess()}
        </>
  )
}

export default EmailVerify

