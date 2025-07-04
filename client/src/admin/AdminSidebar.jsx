import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { isAuthenticated,signout } from '../auth'

const AdminSidebar = () => {
  const { user } = isAuthenticated()
    const [isOpen, setIsOpen] = useState(false)
  const toggleSidebar = () => setIsOpen(!isOpen)

  const navigate=useNavigate()
  return (
    <>
      <div className="flex justify-end p-4">
        <button
          onClick={toggleSidebar}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          aria-label="Toggle Menu"
        >
          Menu
        </button>
      </div>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleSidebar}
        aria-hidden={!isOpen}
      ></div>

       <aside
        className={`fixed top-0 right-0 h-full w-72 bg-gray-900 text-white z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } flex flex-col`}
        aria-label="Admin Dashboard Sidebar"
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h5 className="text-lg font-semibold">Admin Dashboard</h5>
          <button
            onClick={toggleSidebar}
            className="text-white text-2xl font-bold focus:outline-none"
            aria-label="Close Menu"
          >
            &times;
          </button>
        </div>

        <nav className="flex-grow overflow-y-auto px-4 py-6 space-y-4">
          <ul className="space-y-3">
            <li>
              <Link
                to="/admin/dashboard"
                className="block hover:text-green-400 transition-colors"
                onClick={toggleSidebar}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="#" className="block hover:text-green-400 transition-colors" onClick={toggleSidebar}>
                Users
              </Link>
            </li>
            <li>
              <Link to="/admin/product" className="block hover:text-green-400 transition-colors" onClick={toggleSidebar}>
                Products
              </Link>
            </li>
            <li>
              <Link to="/admin/category" className="block hover:text-green-400 transition-colors" onClick={toggleSidebar}>
                Categories
              </Link>
            </li>
            <li>
              <Link to="#" className="block hover:text-green-400 transition-colors" onClick={toggleSidebar}>
                Orders
              </Link>
            </li>
            <li>
              <Link to="/" className="block hover:text-green-400 transition-colors" onClick={toggleSidebar}>
                Go to Homepage
              </Link>
            </li>
            <li>
              <Link to="/admin/addcategory" className="block hover:text-green-400 transition-colors" onClick={toggleSidebar}>
                Add Category
              </Link>
            </li>
            <li>
              <Link to="/admin/addproduct" className="block hover:text-green-400 transition-colors" onClick={toggleSidebar}>
                Add Product
              </Link>
            </li>
          </ul>

          <ul className="mt-8 space-y-2">
            <li>
              <span>
                <b>Name: </b> {user.name}
              </span>
            </li>
            <li>
              <span>
                <b>Email: </b> {user.email}
              </span>
            </li>
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-700">
          <button
            onClick={() => signout(() => {
navigate('/signin')})}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded transition-colors"
          >
            Logout
          </button>
        </div>
      </aside>
  


    </>
  )
}

export default AdminSidebar