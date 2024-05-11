import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'
import { isAuthenticated } from '.'
import Header from '../components/Header'
import Footer from '../components/Footer'
const ClientRoute = () => {
    return(
        isAuthenticated() && isAuthenticated().user.role===0 ?
        //if user- access this
        (
        <>
        <Header/>
        <Outlet/>
        <Footer/>
        </>
        )
        //else direct to signin
         :(
            <Navigate to='/signin'/>
        )  
    )
  
  
}

export default ClientRoute