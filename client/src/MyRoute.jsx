import React from 'react'
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Layout from './components/Layout';
import Homepage from './pages/Homepage';
import Register from './pages/Register';
import Login from './pages/Login';
import Cart from './pages/Cart';
const MyRoute = () => {
  return (
    <Router>
    
    <Routes>
    <Route path='/' element={<Layout/>}>
      <Route index element={<Homepage/>} />
      <Route path='signup' element={<Register/>}/>
      <Route path='signin' elememt={<Login/>}/>
      <Route path='cart' element={<Cart/>}/>
      </Route>
    </Routes>
    
    </Router>
  )
}

export default MyRoute