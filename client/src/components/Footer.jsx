import React from 'react'

const Footer = () => {
  return (
    <div className="bg-gray-600 text-gray-200">
      <footer className="py-12 mt-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap ">
          {[1, 2].map((section) => (
            <div key={section} className="w-full sm:w-1/2 md:w-1/4 px-4 mb-8 md:mb-0">
              <h5 className="text-lg font-semibold mb-4">Section</h5>
              <ul className="flex flex-col space-y-2">
                {['Home', 'Features', 'Pricing', 'FAQs', 'About'].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-gray-200 transition-colors duration-200"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter subscription */}
          <div className="w-full sm:w-1/2 md:w-1/4 px-4">
            <form>
              <h5 className="text-lg font-semibold mb-4">Subscribe to our newsletter</h5>
              <p className="text-gray-300 mb-6">
                Monthly digest of what's new and exciting from us.
              </p>
              <div className="flex gap-2">
                <label htmlFor="newsletter1" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter1"
                  type="email"
                  placeholder="Email address"
                  className="flex-grow px-4 py-2 rounded-md border border-gray-400 bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                  type="button"
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-md transition-colors duration-200"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center border-t border-gray-500 py-6 mt-10 space-y-4 sm:space-y-0">
          <p className="text-gray-400 text-sm">© 2021 Company, Inc. All rights reserved.</p>
          <ul className="flex space-x-6">
            <li>
              <a href="#" className="text-gray-400 hover:text-gray-200 transition-colors duration-200">
                <span className="sr-only">Facebook</span>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54v-2.89h2.54V9.845c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.462h-1.26c-1.243 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-gray-200 transition-colors duration-200">
                <span className="sr-only">Twitter</span>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M23 3a10.9 10.9 0 01-3.14.86 4.48 4.48 0 001.98-2.48 9.14 9.14 0 01-2.88 1.1 4.52 4.52 0 00-7.7 4.12A12.8 12.8 0 013 4.8a4.52 4.52 0 001.4 6.03 4.48 4.48 0 01-2.05-.57v.06a4.52 4.52 0 003.63 4.43 4.52 4.52 0 01-2.04.08 4.52 4.52 0 004.22 3.14A9.07 9.07 0 012 19.54a12.8 12.8 0 006.92 2.03c8.3 0 12.85-6.88 12.85-12.85 0-.2 0-.42-.02-.63A9.22 9.22 0 0023 3z" />
                </svg>
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-gray-200 transition-colors duration-200">
                <span className="sr-only">Instagram</span>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2a1 1 0 110 2 1 1 0 010-2zm-5 3a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6z" />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  )
}

export default Footer
