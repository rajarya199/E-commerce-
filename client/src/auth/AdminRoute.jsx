// import React from 'react'
// import { Outlet,Navigate } from 'react-router-dom'
// import { isAuthenticated } from '.'
// import AdminSidebar from '../admin/AdminSidebar'

// const AdminRoute = () => {
//     isAuthenticated() && isAuthenticated().user.role===1 ?
//       //if admin access this
//     (<>
//     <AdminSidebar/>
//     <Outlet/>   
//     {/* render child route elment */}
//     </>
//     )
//     //else direct to signin
//      :(
//         <Navigate to='/signin'/>
//     )  
  
// }

//  export default AdminRoute

import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { isAuthenticated } from '../auth';
import AdminSidebar from '../admin/AdminSidebar';

const AdminRoute = () => {

  return (
    <>
      {  isAuthenticated() && isAuthenticated().user.role===1 ?
                (
        <>
          <AdminSidebar />
          <Outlet /> {/* Render child route elements */}
        </>
      ) : (
        <Navigate to="/signin"/>
      )}
    </>
  );
};

export default AdminRoute;
