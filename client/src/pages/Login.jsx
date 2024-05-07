import React from 'react'
import { Link } from 'react-router-dom'
const Login = () => {
  return (
    <>
        <div className="d-flex justify-content-center">
  <div className="col-lg-5 mt-4">
    <form className="p-3 shadow-lg">
      <h2 className="text-center text-success my-2">Login Form</h2>
      
     
      <div className="mb-3">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" className="form-control" />
      </div>
      <div className="mb-3">
        <label htmlFor="pass">Password</label>
        <input type="password" id="pass" className="form-control" />
      </div>
     
      <div className="mb-3">
        <button type="submit" className="btn btn-primary">
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