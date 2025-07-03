import {
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon,
} from 'lucide-react'
 const Footer= () => {
  return (
    <footer className="w-full bg-[#0a0908] border-t border-amber-900/30">
      {/* Vintage texture overlay */}
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="text-amber-500 font-serif text-2xl tracking-tighter">
              VINTAGE
              <span className="text-amber-200 text-sm ml-1 tracking-widest">
                EMPORIUM
              </span>
            </div>
            <p className="text-amber-200/70 text-sm">
              Curating timeless treasures for the discerning collector. Each
              piece tells a story of craftsmanship and heritage.
            </p>
            <div className="flex space-x-4 pt-2">
              <a
                href="#"
                className="text-amber-500 hover:text-amber-400 transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon size={18} />
              </a>
              <a
                href="#"
                className="text-amber-500 hover:text-amber-400 transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon size={18} />
              </a>
              <a
                href="#"
                className="text-amber-500 hover:text-amber-400 transition-colors"
                aria-label="Twitter"
              >
                <TwitterIcon size={18} />
              </a>
            </div>
          </div>
          {/* Quick Links */}
          <div>
            <h3 className="text-amber-100 font-serif text-lg mb-4 pb-2 border-b border-amber-900/30">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-amber-200/70 hover:text-amber-100 transition-colors text-sm"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-amber-200/70 hover:text-amber-100 transition-colors text-sm"
                >
                  Shop
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-amber-200/70 hover:text-amber-100 transition-colors text-sm"
                >
                  Collections
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-amber-200/70 hover:text-amber-100 transition-colors text-sm"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-amber-200/70 hover:text-amber-100 transition-colors text-sm"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-amber-200/70 hover:text-amber-100 transition-colors text-sm"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          {/* Contact Info */}
          <div>
            <h3 className="text-amber-100 font-serif text-lg mb-4 pb-2 border-b border-amber-900/30">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPinIcon
                  size={16}
                  className="text-amber-500 mr-2 mt-0.5 flex-shrink-0"
                />
                <span className="text-amber-200/70 text-sm">
                  123 Antique Row, Vintage Valley, CA 90210
                </span>
              </li>
              <li className="flex items-center">
                <PhoneIcon
                  size={16}
                  className="text-amber-500 mr-2 flex-shrink-0"
                />
                <span className="text-amber-200/70 text-sm">
                  (555) 123-4567
                </span>
              </li>
              <li className="flex items-center">
                <MailIcon
                  size={16}
                  className="text-amber-500 mr-2 flex-shrink-0"
                />
                <span className="text-amber-200/70 text-sm">
                  info@vintageemporium.com
                </span>
              </li>
            </ul>
          </div>
          {/* Newsletter */}
          <div>
            <h3 className="text-amber-100 font-serif text-lg mb-4 pb-2 border-b border-amber-900/30">
              Newsletter
            </h3>
            <p className="text-amber-200/70 text-sm mb-4">
              Subscribe to receive updates on new arrivals and special
              promotions.
            </p>
            <form className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-2 bg-black/40 backdrop-blur-sm border border-amber-700/30 text-amber-100 placeholder-amber-500/50 focus:outline-none focus:border-amber-500 text-sm"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-amber-800 hover:bg-amber-700 text-amber-100 px-4 py-2 text-sm transition-all duration-300 border-b-2 border-amber-600 hover:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        {/* Bottom Section */}
        <div className="border-t border-amber-900/30 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-amber-200/50 text-xs mb-4 md:mb-0">
            © {new Date().getFullYear()} Vintage Emporium. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-amber-200/50 hover:text-amber-200 text-xs transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-amber-200/50 hover:text-amber-200 text-xs transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-amber-200/50 hover:text-amber-200 text-xs transition-colors"
            >
              Shipping Info
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer