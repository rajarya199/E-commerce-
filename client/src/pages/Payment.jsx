import { API } from '../config'
import axios from 'axios'
import { isAuthenticated } from '../auth'
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'
const options = {
    style: {
        base: {
            fontSize: '16px'
        },
        invalid: {
            color: '#9e2146'
        }
    }
}
const Payment = () => {
       const stripe = useStripe()
    const elements = useElements()
    const cartItems = JSON.parse(localStorage.getItem('cartItems'))
    const shippingInfo = JSON.parse(localStorage.getItem('shippingInfo'))
    const { user, token } = isAuthenticated()
    const navigate = useNavigate()
    const orderItems = cartItems.map(item => ({
  product: item.id,       // ✅ map 'id' → 'product'
  quantity: item.quantity
}));
      const order={
        orderItems,
        shippingAddress1:shippingInfo.shippingAddress1,
        shippingAddress2:shippingInfo.shippingAddress2,
        city:shippingInfo.city,
        zip:shippingInfo.zip,
        country:shippingInfo.country,
        phone:shippingInfo.phone,
        user:user._id
    }
        const orderInfo=JSON.parse(sessionStorage.getItem('orderInfo'))
  const paymentData={
        amount:Math.round(orderInfo.totalPrice*100)
    }
 const submitHandler=async(e)=>{
        e.preventDefault()
        document.querySelector('#pay-btn').disabled=true
        let res 
        try{
            const config={
                headers:{
                    'Content-Type':'application/json',
                    Authorization:`Bearer ${token}`
                }
            }
            res=await axios.post(`${API}/process/payment`,paymentData,config)
            const client_secret=res.data.client_secret

            if(!stripe || !elements){
                return 
            }
            const result=await stripe.confirmCardPayment(`${client_secret}`,{
                payment_method:{
                    card:elements.getElement(CardNumberElement),
                   billing_details:{
                    name:user.name,
                    email:user.email
                   } 
                }
            })
            if(result.error){
                toast.error(result.error.message)
                document.querySelector('#pay-btn').disabled=false
            }
            else{
                // payment processed or not 
                if(result.paymentIntent.status==='succeeded'){
                    order.paymentInfo={
                        id:result.paymentIntent.id,
                        status:result.paymentIntent.status
                    }
                    try{
                        const config={
                            headers:{
                                'Content-Type':'application/json',
                                Authorization:`Bearer ${token}`
                            }
                        }
                        const {data}=await axios.post(`${API}/postorder`,order,config)
                        localStorage.removeItem('cartItems')
                        navigate('/success')
                    }
                    catch(error){
                        toast.error(error)
                    }
                }
                else{
                    toast.error('something went wrong while processing')
                }
            }

        }
        catch(error){
            document.querySelector('#pay-btn').disabled=false
            toast.error(error.message)

        }

    }

  return (
    <div>
         <ToastContainer theme='colored' />
          <div className="container mx-auto px-4">
  <div className="flex justify-center">
    <div className="w-full max-w-md shadow-lg p-6 my-10 rounded-lg bg-white">
      <form onSubmit={submitHandler}>
        <h2 className="mb-6 text-xl font-semibold">Card Information</h2>

        {/* Card Number */}
        <div className="mb-5">
          <label htmlFor="card-number" className="block mb-2 font-medium text-gray-700">
            Card Number
          </label>
          <CardNumberElement
            type="text"
            id="card-number"
            options={options}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Card Expiry */}
        <div className="mb-5">
          <label htmlFor="card-expiry" className="block mb-2 font-medium text-gray-700">
            Card Expiry
          </label>
          <CardExpiryElement
            type="text"
            id="card-expiry"
            options={options}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Card CVC */}
        <div className="mb-5">
          <label htmlFor="card-cvc" className="block mb-2 font-medium text-gray-700">
            Card CVC
          </label>
          <CardCvcElement
            type="text"
            id="card-cvc"
            options={options}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Pay Now Button */}
        <div className="mb-3">
          <button
            id="pay-btn"
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 rounded transition-colors duration-200"
          >
            Pay Now
          </button>
        </div>
      </form>
    </div>
  </div>
</div>

    </div>
  )
}

export default Payment