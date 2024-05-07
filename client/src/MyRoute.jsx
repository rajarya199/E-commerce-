import React from 'react'
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Layout from './components/Layout';
import Homepage from './pages/Homepage';
import Register from './pages/Register';
import Login from './pages/Login';
import Cart from './pages/Cart';
import ForgetPassword from './pages/ForgetPassword';
import Products from './pages/Products';
const MyRoute = () => {
  return (
    <Router>
    
    <Routes>
    <Route path='/' element={<Layout/>}>
      <Route index element={<Homepage/>} />
      <Route path='signup' element={<Register/>}/>
      <Route path='signin' element={<Login/>}/>
      <Route path='cart' element={<Cart/>}/>
      <Route path='forgetpassword' element={<ForgetPassword/>}/>
      <Route path="products" element={<Products/>}/>
      </Route>
    </Routes>
    
    </Router>
  )
}

export default MyRoute