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
     <div className="alert alert-danger">
      {error}
     </div>
  )

  // to show success msg
  const showSuccess=()=>(
      success &&
      <div className='alert alert-success'>
         New account created, verify your account before login
      </div>
  )

return (
  <>
  <div className="d-flex justify-content-center">
      <div className="col-lg-5 my-4">
          <form className="p-3 shadow-lg">
              <h2 className="text-center text-success my-2">
                  Register Form
              </h2>
              {showError()}
              {showSuccess()}
              <div className="mb-3">
                  <label htmlFor="fname">FullName</label>
                  <input type="text" id="fname" className="form-control" 
                  onChange={handleChange('name')} value={name}
                  />
              </div>
              <div className="mb-3">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" className="form-control"
                   onChange={handleChange('email')} value={email}/>
              </div>
              <div className="mb-3">
                  <label htmlFor="pass">Password</label>
                  <input type="password" id="pass" className="form-control"
                   onChange={handleChange('password')} value={password}
                  />
              </div>
              <div className="mb-3">
                  <label htmlFor="cpass">Confirm Password</label>
                  <input type="password" id="cpass" onChange={handleChange('cpassword')} value={cpassword} className="form-control"/>
              </div>
              <div className="mb-3">
                  <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Register</button>
              </div>
          </form>
      </div>
  </div>

  </>
)
}

export default Register