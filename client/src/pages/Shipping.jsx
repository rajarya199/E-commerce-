import React,{useState} from 'react'
import { countries } from 'countries-list'
import { useNavigate } from 'react-router-dom'

const Shipping = () => {
        const navigate=useNavigate()
    const countriesList=Object.values(countries)
    const shippingInfo=JSON.parse(localStorage.getItem('shippingInfo')) || {}

    const[shippingAddress1,setShippingAddress1]=useState(shippingInfo.shippingAddress1 || '')
    const[shippingAddress2,setShippingAddress2]=useState(shippingInfo.shippingAddress2 || '')
    const[city,setCity]=useState(shippingInfo.city || '')
    const[zip,setZip]=useState(shippingInfo.zip || '')
    const[country,setCountry]=useState(shippingInfo.country || '')
    const[phone,setPhone]=useState(shippingInfo.phone || '')
       // save shipping info 
    const submitHandler=e=>{
        e.preventDefault()
        const shippingInfo={
            shippingAddress1,
            shippingAddress2,
            city,
            zip,
            country,
            phone
        }
        localStorage.setItem('shippingInfo',JSON.stringify(shippingInfo))
        navigate('/confirm')
    }
  return (
    <>
  <div className="container mx-auto px-4">
  <div className="flex justify-center">
    <div className="w-full max-w-md shadow-lg p-6 my-10 rounded-lg bg-white">
      <form>
        <h2 className="mb-6 text-gray-600 text-2xl font-semibold">Shipping Information</h2>

        {/* Shipping Address 1 */}
        <div className="mb-4">
          <label htmlFor="address1" className="block mb-1 font-medium text-gray-700">
            Shipping Address 1
          </label>
          <input
            type="text"
            id="address1"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={(e) => setShippingAddress1(e.target.value)}
            value={shippingAddress1}
          />
        </div>

        {/* Shipping Address 2 */}
        <div className="mb-4">
          <label htmlFor="address2" className="block mb-1 font-medium text-gray-700">
            Shipping Address 2
          </label>
          <input
            type="text"
            id="address2"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={(e) => setShippingAddress2(e.target.value)}
            value={shippingAddress2}
          />
        </div>

        {/* City */}
        <div className="mb-4">
          <label htmlFor="city" className="block mb-1 font-medium text-gray-700">
            City
          </label>
          <input
            type="text"
            id="city"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={(e) => setCity(e.target.value)}
            value={city}
          />
        </div>

        {/* Zip */}
        <div className="mb-4">
          <label htmlFor="zip" className="block mb-1 font-medium text-gray-700">
            Zip
          </label>
          <input
            type="number"
            id="zip"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={(e) => setZip(e.target.value)}
            value={zip}
          />
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label htmlFor="phone" className="block mb-1 font-medium text-gray-700">
            Phone
          </label>
          <input
            type="number"
            id="phone"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
          />
        </div>

        {/* Country */}
        <div className="mb-6">
          <label htmlFor="country" className="block mb-1 font-medium text-gray-700">
            Country
          </label>
          <select
            id="country"
            className="w-full px-3 py-2 border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={(e) => setCountry(e.target.value)}
            value={country}
          >
            <option value={country}>{country}</option>
            {countriesList.map((c, i) => (
              <option key={i} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            onClick={submitHandler}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-3 rounded transition-colors duration-200"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  </div>
</div>

    </>
  )
}

export default Shipping