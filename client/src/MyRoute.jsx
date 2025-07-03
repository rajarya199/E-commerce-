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
import AddCategory from './admin/AddCategory';
import Category from './admin/Category';
import AddProduct from './admin/AddProduct'
import Product from './admin/Product';
import ProductDetails from "./pages/ProductDetails";
import Shipping from "./pages/Shipping";
import ConfirmOrder from './pages/ConfirmOrder';
import PaymentElement from './pages/PaymentElement';
import Success from './pages/Success';

const MyRoute = () => {
  return (
    <Router>
    
    <Routes>
    <Route path='/' element={<Layout/>}>
      <Route index element={<Homepage/>} />
      <Route path='productdetails/:productId' element={<ProductDetails/>}/>
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
        <Route path='shipping' element={<Shipping/>}/>
            <Route path='confirm' element={<ConfirmOrder/>}/>
            <Route path='payment' element={<PaymentElement/>}/>
            <Route path="/success" element={<Success/>} />



         
      </Route>

      {/* admin */}
      <Route path='admin/' element={<AdminRoute/>}>
        <Route path='dashboard' element={<Dashboard/>}/>
        <Route path='addcategory' element={<AddCategory/>}/>
        <Route path='category' element={<Category/>}/>
        <Route path='addproduct' element={<AddProduct/>}/>
        <Route path='product' element={<Product/>}/>
      </Route>

      <Route path='/*' element={<NotFound/>}/>
    </Routes>
    
    </Router>
  )
}

export default MyRoute