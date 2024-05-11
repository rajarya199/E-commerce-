import React from 'react'
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Layout from './components/Layout';
import Homepage from './pages/Homepage';
import Register from './pages/Register';
import Login from './pages/Login';
import Cart from './pages/Cart';
import EmailVerify from './auth/EmailVerify';
import ForgetPassword from './pages/ForgetPassword';
import Products from './pages/Products';
import NotFound from './pages/NotFound';
import AdminRoute from './auth/AdminRoute';
import Dashboard from './admin/Dashboard';
import ClientRoute from './auth/ClientRoute';
import Profile from './pages/Profile';

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
      <Route path="email/confirmation/:token" element={<EmailVerify />} /> 
      </Route>

      {/* user route */}
      <Route path='/' element={<ClientRoute/>}>
        <Route path='profile' element={<Profile/>}/>
         
      </Route>

      {/* admin */}
      <Route path='/admin/' element={<AdminRoute/>}>
        <Route path='dashboard' element={<Dashboard/>}/>
      </Route>

      <Route path='/*' element={<NotFound/>}/>
    </Routes>
    
    </Router>
  )
}

export default MyRoute