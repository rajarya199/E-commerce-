import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { signin,isAuthenticated,authenticate } from '../auth'
const Login = () => {
  const navigate=useNavigate()
  const{user}=isAuthenticated()
  const[values,setValues]=useState({
    email:'',
    password:'',
    error:'',
    redirectToPage:false
  })
  const{email,password,error,redirectToPage}=values

  const handleChange=name=>event=>{
    setValues({...values,error:false,[name]:event.target.value})
}

const handleSubmit=e=>{
e.preventDefault()
setValues({...values,error:false})
//call signin fn with email password
signin({email,password})
.then(data=>{
  if(data.error){
    setValues({...values,error:data.error})
  }
  else{
    authenticate(data,()=>{
      //save user data and redirect:true
      setValues({...values,redirectToPage:true}) 
  })
  }
})
}

const showError=()=>(
  //if error display error #c3af86
 error && 
<div className="bg-vntx-300 border border-vnbrd-100 text-vnbrd-100 px-4 py-3 rounded" role="alert">
  {error}
</div>


)
const redirectUser=()=>{
  if(redirectToPage){
      if (user && user.role==1){
          return navigate('/admin/dashboard')
      }
      else{
          return  navigate('/profile')
      }
  }
}


  return (
    <>

<div className="flex justify-center">
  <div className="w-full max-w-lg mt-8 mb-8">
   <form className="p-6 shadow-lg rounded-lg bg-vnbg-100 border border-vnbrd-100" onSubmit={handleSubmit}>
  <h2 className="text-center my-4 text-2xl font-semibold text-vntx-100">Login Form</h2>
  {showError()}
  {redirectUser()}
  {/* {showSuccess()} */}

  <div className="mb-5">
    <label htmlFor="email" className="block mb-2 font-medium text-vntx-200">
      Email
    </label>
    <input
      type="email"
      id="email"
      className="w-full px-4 py-2 border border-vnbrd-100 rounded bg-vninp-100 text-vntx-400 placeholder-vninpl-100 focus:outline-none focus:ring-2 focus:ring-[#D9B382]"
      onChange={handleChange('email')}
      value={email}
      placeholder="your.email@example.com"
    />
  </div>

  <div className="mb-5">
    <label htmlFor="pass" className="block mb-2 font-medium text-vntx-200">
      Password
    </label>
    <input
      type="password"
      id="pass"
            className="w-full px-4 py-2 border border-vnbrd-100 rounded bg-vninp-100 text-vntx-400 placeholder-vninpl-100 focus:outline-none focus:ring-2 focus:ring-[#D9B382]"

      onChange={handleChange('password')}
      value={password}
      placeholder="Enter your password"
    />
  </div>

  <div className="mb-5">
    <button
      type="submit"
      className="w-full bg-vnbtn-100 hover:bg-[#C4A76A] text-[#3E2C23] font-semibold py-2 rounded transition-colors duration-200 shadow-md"
    >
      Login
    </button>
  </div>

  <div className="flex justify-between text-sm">
    <Link
      to="/forgetpassword"
      className="text-vntx-300 hover:underline"
    >
      Forget Password?
    </Link>
    <Link
      to="/signup"
      className="text-vntx-300 hover:underline"
    >
      Create a New Account?
    </Link>
  </div>
</form>

  </div>
</div>


    </>
  )
}

export default Login