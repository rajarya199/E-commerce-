import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { isAuthenticated, signout } from '../auth'

const Header = () => {
  const navigate = useNavigate()
  const user = isAuthenticated()?.user

  return (
    <>
      {/* Top Bar */}
      <div className="bg-secondary py-2 text-white">
        <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between">
          <Link className="navbar-brand text-white fw-bold fs-4" to="/">
            Ecommerce
          </Link>

          {/* Search Bar */}
          <form className="d-flex my-2 my-md-0 w-100 w-md-50">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-warning" type="submit">
              <i className="fas fa-search" />
            </button>
          </form>

          {/* User Actions */}
          <div className="d-flex align-items-center mt-2 mt-md-0">
            {/* Admin/Profile */}
            {user?.role === 1 && (
              <Link to="/admin/dashboard" className="text-white me-3 text-decoration-none">
                Admin
              </Link>
            )}
            {user?.role === 0 && (
              <Link to="/profile" className="text-white me-3 text-decoration-none">
                Profile
              </Link>
            )}

            {/* Auth */}
            {!user && (
              <>
                <Link to="/signin" className="text-white me-3" title="Signin">
                  <i className="fas fa-sign-in-alt fs-5" />
                </Link>
                <Link to="/signup" className="text-white me-3" title="Signup">
                  <i className="fas fa-user-plus fs-5" />
                </Link>
              </>
            )}

            {/* Logout */}
            {user && (
              <button
                className="btn btn-danger btn-sm me-3"
                onClick={() => signout(() => navigate('/signin'))}
              >
                Logout
              </button>
            )}

            {/* Cart */}
            <Link to="/cart" className="text-white position-relative">
              <i className="fas fa-cart-plus fs-5" />
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark"
                style={{ fontSize: 12 }}
              >
                5
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Responsive Navigation Bar */}
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
        <div className="container">
          {/* Hamburger toggler for mobile */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNavbar"
            aria-controls="mainNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          {/* Nav links: horizontal on md+, vertical dropdown on mobile */}
          <div className="collapse navbar-collapse" id="mainNavbar">
            <ul className="navbar-nav ms-auto mb-2 mb-md-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/products">
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">
                  Customer Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header
