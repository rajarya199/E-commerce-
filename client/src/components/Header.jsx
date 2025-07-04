
import { isAuthenticated, signout } from '../auth'

import { Link,useNavigate } from 'react-router-dom'

import React, { useState,useEffect } from 'react'
import {
  SearchIcon,
  ShoppingCartIcon,
  UserIcon,
  MenuIcon,
  XIcon,
  LogOutIcon,
} from 'lucide-react'
 const Header = () => {
  const navigate = useNavigate()
    const user = isAuthenticated()?.user
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [cartCount, setCartCount] = useState(0)

    useEffect(() => {
    const updateCartCount = () => {
      const cartData = localStorage.getItem('cartItems')
      try {
        const item = JSON.parse(cartData || '[]')
        setCartCount(item.length || 0)
      } catch {
        setCartCount(0)
      }
    }
    updateCartCount()
      // Optional: listen for storage updates (for multi-tab sync)
    window.addEventListener('storage', updateCartCount)

    return () => window.removeEventListener('storage', updateCartCount)
},[])
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    if (isSearchOpen) setIsSearchOpen(false)
  }
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen)
    if (isMenuOpen) setIsMenuOpen(false)
  }
 
  return (
    <nav className="bg-[#121212] border-b border-amber-900/30 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <div className="text-amber-500 font-serif text-2xl tracking-tighter">
              EVEREST
              <span className="text-amber-200 text-sm ml-1 tracking-widest">
                EMPORIUM
              </span>
            </div>
          </div>
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <a
                href="/"
                className="text-amber-200 hover:text-amber-100 transition-colors px-2 py-1 text-sm tracking-wider"
              >
                HOME
              </a>
              <a
                href="/"
                className="text-amber-200 hover:text-amber-100 transition-colors px-2 py-1 text-sm tracking-wider"
              >
                SHOP
              </a>
              <a
                href="/products"
                className="text-amber-200 hover:text-amber-100 transition-colors px-2 py-1 text-sm tracking-wider"
              >
                PRODUCTS
              </a>
              <a
                href="#"
                className="text-amber-200 hover:text-amber-100 transition-colors px-2 py-1 text-sm tracking-wider"
              >
                ABOUT
              </a>
              <a
                href="#"
                className="text-amber-200 hover:text-amber-100 transition-colors px-2 py-1 text-sm tracking-wider"
              >
                CONTACT
              </a>
            </div>
          </div>
          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Search */}
            <div className="relative">
              <button
                onClick={toggleSearch}
                className="text-amber-200/80 hover:text-amber-100 transition-colors"
                aria-label="Search"
              >
                <SearchIcon size={20} />
              </button>
              {isSearchOpen && (
                <div className="absolute right-0 top-full mt-2 w-64">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search products..."
                      className="w-full px-4 py-2 bg-black/80 backdrop-blur-sm border border-amber-700/30 text-amber-100 placeholder-amber-500/50 focus:outline-none focus:border-amber-500"
                    />
                    <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-amber-500">
                      <SearchIcon size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
            {/* User */}
            <div className="relative group">
              <button
                className="text-amber-200/80 hover:text-amber-100 transition-colors"
                aria-label="User account"
              >
                <UserIcon size={20} />
              </button>
              <div className="absolute right-0 top-full mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="bg-black/80 backdrop-blur-sm border border-amber-700/30 py-2">
                  {isAuthenticated() ? (
                    <>
                    {user.role===1 &&(
                      <Link     to="/admin/dashboard"
                        className="block px-4 py-2 text-sm text-amber-200 hover:bg-amber-900/30 transition-colors">
                            Admin
                      </Link>
                    )}
                    {user.role===0 &&(
                      <>
 <Link
                        to='/profile'
                        className="block px-4 py-2 text-sm text-amber-200 hover:bg-amber-900/30 transition-colors"
                      >
                        Profile
                      </Link>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-amber-200 hover:bg-amber-900/30 transition-colors"
                      >
                        Orders
                      </a>
                       </>
                    )}
                     
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-amber-200 hover:bg-amber-900/30 transition-colors"
                      >
                        Settings
                      </a>
                      <button
                            onClick={()=>signout(()=>{
                  navigate('/signin')
                    })}
                        className="w-full text-left px-4 py-2 text-sm text-amber-200 hover:bg-amber-900/30 transition-colors flex items-center"
                      >
                        <LogOutIcon size={14} className="mr-2" /> Sign out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                      to="/signin"
                        className="w-full text-left px-4 py-2 text-sm text-amber-200 hover:bg-amber-900/30 transition-colors"
                      >
                        Sign in
                      </Link>
                      <Link
                        to="/register"
                        className="block px-4 py-2 text-sm text-amber-200 hover:bg-amber-900/30 transition-colors"
                      >
                        Register
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
            {/* Cart */}
            <div className="relative">
              <Link to="/cart"
                className="text-amber-200/80 hover:text-amber-100 transition-colors"
                aria-label="Shopping cart"
              >
                <ShoppingCartIcon size={20} />
                <span className="absolute -top-2 -right-2 bg-amber-600 text-amber-100 text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {cartCount}

                </span>
              </Link>
            </div>
          </div>
          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-4">
            {/* Mobile Search */}
            <button
              onClick={toggleSearch}
              className="text-amber-200/80 hover:text-amber-100 transition-colors"
              aria-label="Search"
            >
              <SearchIcon size={20} />
            </button>
            {/* Mobile Cart */}
            <button
              className="text-amber-200/80 hover:text-amber-100 transition-colors"
              aria-label="Shopping cart"
            >
              <ShoppingCartIcon size={20} />
              <span className="absolute top-3 bg-amber-600 text-amber-100 text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {cartCount}

              </span>
            </button>
            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMenu}
              className="text-amber-200/80 hover:text-amber-100 transition-colors"
              aria-label="Open menu"
            >
              {isMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Search Panel */}
      {isSearchOpen && (
        <div className="md:hidden px-4 pb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 bg-black/80 backdrop-blur-sm border border-amber-700/30 text-amber-100 placeholder-amber-500/50 focus:outline-none focus:border-amber-500"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-amber-500">
              <SearchIcon size={16} />
            </button>
          </div>
        </div>
      )}
      {/* Mobile Menu */}
       {isMenuOpen && (
        <div className="md:hidden border-t border-amber-900/30">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-[#121212]">
            <Link to="/" className="block px-3 py-2 text-amber-200 hover:bg-amber-900/30">HOME</Link>
            <Link to="/" className="block px-3 py-2 text-amber-200 hover:bg-amber-900/30">SHOP</Link>
            <Link to="/products" className="block px-3 py-2 text-amber-200 hover:bg-amber-900/30">PRODUCTS</Link>
            <a href="#" className="block px-3 py-2 text-amber-200 hover:bg-amber-900/30">ABOUT</a>
            <a href="#" className="block px-3 py-2 text-amber-200 hover:bg-amber-900/30">CONTACT</a>

            <div className="border-t border-amber-900/30 mt-2 pt-2">
              {isAuthenticated() ? (
                <>
                  {user?.role === 1 && <Link to="/admin/dashboard" className="flex items-center px-3 py-2 text-amber-200 hover:bg-amber-900/30">Admin</Link>}
                  {user?.role === 0 && <Link to="/profile" className="flex items-center px-3 py-2 text-amber-200 hover:bg-amber-900/30">Profile</Link>}
                  <button onClick={() => signout(() => navigate('/signin'))} className="w-full flex items-center px-3 py-2 text-amber-200 hover:bg-amber-900/30">
                    <LogOutIcon size={16} className="mr-2" /> Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/signin" className="block px-3 py-2 text-amber-200 hover:bg-amber-900/30">Sign in</Link>
                  <Link to="/register" className="block px-3 py-2 text-amber-200 hover:bg-amber-900/30">Register</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}


export default Header
