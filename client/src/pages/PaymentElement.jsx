// components/PaymentElement.jsx
import React, { useState, useEffect } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
import Payment from './Payment'
import { API } from '../config'

const PaymentElement = () => {
  const [stripePromise, setStripePromise] = useState(null)

  useEffect(() => {
    const getStripeApiKey = async () => {
      try {
        const { data } = await axios.get(`${API}/stripeapi`)
        const stripe = await loadStripe(data.stripeApiKey)
        setStripePromise(stripe)
      } catch (error) {
        console.error('Error loading Stripe:', error)
      }
    }
    getStripeApiKey()
  }, [])

  return (
    <>
      {stripePromise && (
        <Elements stripe={stripePromise}>
          <Payment />
        </Elements>
      )}
    </>
  )
}

export default PaymentElement
