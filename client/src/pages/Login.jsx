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
  //if error display error
 error && 
 <div className="alert alert-danger">
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
        <div className="d-flex justify-content-center">
  <div className="col-lg-5 mt-4">
    <form className="p-3 shadow-lg">
      <h2 className="text-center text-success my-2">Login Form</h2>
      {showError()}
      {redirectUser()}
       {/* {showSuccess()}  */}
     
      <div className="mb-3">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" className="form-control"
                           onChange={handleChange('email')} value={email}/>
                           
      </div>
      <div className="mb-3">
        <label htmlFor="pass">Password</label>
        <input type="password" id="pass" className="form-control"
        onChange={handleChange('password')} value={password} />
      </div>
     
      <div className="mb-3">
        <button type="submit" className="btn btn-primary"
        onClick={handleSubmit}>
          login
        </button>
      </div>
      <div className="d-flex justify-content-between">
        <Link to='/forgetpassword' className='text-decoration-none'>
            Forget Password?
        </Link>
        <Link to='/signup' className='text-decoration-none'>
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