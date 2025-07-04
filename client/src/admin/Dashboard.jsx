import React from 'react'
import { isAuthenticated } from '../auth'
import { Link } from 'react-router-dom'
import AdminSidebar from './AdminSidebar'
const Dashboard = () => {
    const {user}=isAuthenticated()
  return (
    <>
<div className="container mx-auto px-4">
  <h2 className="text-center my-6 text-vntx-100 text-2xl font-semibold">Admin Dashboard</h2>
  <div className="flex flex-wrap -mx-4">
    {/* Card Template */}
    {[
      {
        title: 'Total Orders',
        subtitle: 'Delivered: 0',
        icon: (
          <i className="fab fa-first-order-alt fa-spin text-green-600 text-5xl"></i>
        ),
        bgColor: 'bg-white',
        textColorTitle: 'text-blue-600',
        textColorSubtitle: 'text-gray-600',
      },
      {
        title: 'Total Users',
        subtitle: 'Deactivated: 0',
        icon: <i className="fas fa-users text-green-600 text-5xl"></i>,
        bgColor: 'bg-yellow-400',
        textColorTitle: 'text-white',
        textColorSubtitle: 'text-gray-200',
      },
      {
        title: 'Total Products',
        subtitle: 'Out of Stock: 0',
        icon: (
          <i className="fas fa-globe fa-spin text-white text-5xl"></i>
        ),
        bgColor: 'bg-green-600',
        textColorTitle: 'text-white',
        textColorSubtitle: 'text-yellow-400',
      },
      {
        title: 'Total Sales',
        subtitle: 'Booking: 0',
        icon: <i className="fas fa-globe text-white text-5xl"></i>,
        bgColor: 'bg-red-600',
        textColorTitle: 'text-white',
        textColorSubtitle: 'text-white',
      },
      {
        title: 'Admins',
        subtitle: 'Super Admin: 1',
        icon: <i className="fas fa-users text-white text-5xl"></i>,
        bgColor: 'bg-blue-700',
        textColorTitle: 'text-white',
        textColorSubtitle: 'text-white',
      },
      {
        title: 'Categories',
        subtitle: 'Sub-Categories: 0',
        icon: <i className="fas fa-globe text-white text-5xl"></i>,
        bgColor: 'bg-gray-800',
        textColorTitle: 'text-white',
        textColorSubtitle: 'text-white',
      },
    ].map(({ title, subtitle, icon, bgColor, textColorTitle, textColorSubtitle }, idx) => (
      <div key={idx} className="w-full sm:w-1/2 xl:w-1/3 p-4">
        <Link to="#" className="no-underline">
          <div className={`shadow-lg border-0 py-4 rounded-lg ${bgColor}`}>
            <div className="flex flex-col items-center">
              <div className={`uppercase font-bold text-xs mb-2 text-center ${textColorTitle}`}>
                {title}
              </div>
              <div className={`font-semibold mb-4 text-center ${textColorSubtitle}`}>
                {subtitle}
              </div>
              <div className="text-center">
                {icon}
              </div>
            </div>
          </div>
        </Link>
      </div>
    ))}
  </div>
</div>
    </>
  )
}

export default Dashboard