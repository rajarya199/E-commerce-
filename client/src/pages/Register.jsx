import { useState } from "react"
import React from 'react'
import { signup } from "../auth"

const Register = () => {
  const[values,setValues]=useState({
      name:'',
      email:'',
      password:'',
      cpassword:'',
      error:'',
      success:false
  })
  // object destructuring
  const{name,email,password,error,success,cpassword}=values 
  // const name=values.name


  //const handleChange=parameter a => event e{}
  const handleChange=name=>event=>{
      setValues({...values,error:false,[name]:event.target.value})
      //setValue({...values -same state
      //error=f
      //[obj-parmter]:e.target.value
       //i.e =name=e.target.value,email=e.target.value 
  }


  const handleSubmit=e=>{
      e.preventDefault() //prevent form  Bydefault action
      setValues({...values})
      if(password !==cpassword){
        setValues({...values,error:'password donot match'})
      }
      else{
        signup({name,email,password}) //single arg as obj {n,e,p}
        .then(data=>{
            if(data.error){
               setValues({...values,error:data.error}) 
            }
            else{
                //after data submit form input are make empty
                setValues({...values,name:'',email:'',password:'',success:true,cpassword:''})
            }
        })
      }
      // signup function 
    
  }

  //to show error msg 
  const showError=()=>(
      //if error display error
     error && 
    <div className="bg-vntx-300 border border-vnbrd-100 text-vnbrd-100 px-4 py-3 rounded" role="alert">
  {error}
</div>
  )

  // to show success msg
  const showSuccess=()=>(
      success &&
    <div
  className="bg-vntx-300 border border-vnbrd-100 text-vnbrd-100 px-4 py-3 rounded"
  role="alert"
>
  New account created, verify your account before login
</div>
  )
  

return (
  <>
<div className="flex justify-center">
  <div className="w-full max-w-lg my-8">
    <form
      className="p-6 shadow-lg rounded-lg bg-vnbg-100 border border-vnbrd-100"
      onSubmit={handleSubmit}
    >
      <h2 className="text-center my-4 text-2xl font-semibold text-vntx-100">
        Register Form
      </h2>
      {showError()}
      {showSuccess()}

      <div className="mb-5">
        <label
          htmlFor="fname"
          className="block mb-2 font-medium text-vntx-200"
        >
          FullName
        </label>
        <input
          type="text"
          id="fname"
          className="w-full px-4 py-2 border border-vnbrd-100 rounded bg-vninp-100 text-vntx-400 placeholder-vninpl-100 focus:outline-none focus:ring-2 focus:ring-vntx-200"
          onChange={handleChange("name")}
          value={name}
          placeholder="Enter your full name"
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="email"
          className="block mb-2 font-medium text-vntx-200"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          className="w-full px-4 py-2 border border-vnbrd-100 rounded bg-vninp-100 text-vntx-400 placeholder-vninpl-100 focus:outline-none focus:ring-2 focus:ring-vntx-200"
          onChange={handleChange("email")}
          value={email}
          placeholder="your.email@example.com"
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="pass"
          className="block mb-2 font-medium text-vntx-200"
        >
          Password
        </label>
        <input
          type="password"
          id="pass"
          className="w-full px-4 py-2 border border-vnbrd-100 rounded bg-vninp-100 text-vntx-400 placeholder-vninpl-100 focus:outline-none focus:ring-2 focus:ring-vntx-200"
          onChange={handleChange("password")}
          value={password}
          placeholder="Enter your password"
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="cpass"
          className="block mb-2 font-medium text-vntx-200"
        >
          Confirm Password
        </label>
        <input
          type="password"
          id="cpass"
          className="w-full px-4 py-2 border border-vnbrd-100 rounded bg-vninp-100 text-vntx-400 placeholder-vninpl-100 focus:outline-none focus:ring-2 focus:ring-vntx-200"
          onChange={handleChange("cpassword")}
          value={cpassword}
          placeholder="Confirm your password"
        />
      </div>

      <div className="mb-3">
        <button
          type="submit"
          className="w-full bg-vnbtn-100 hover:bg-vnbtn-200 text-vnbg-100 font-semibold py-2 rounded transition-colors duration-200"
        >
          Register
        </button>
      </div>
    </form>
  </div>
</div>



  </>
)
}

export default Register