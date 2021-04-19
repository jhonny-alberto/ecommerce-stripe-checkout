import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'
import {
  ORDER_PAY_REQUEST,
  ORDER_PAY_FAIL,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_RESET
} from '../constants/orderConstants'

const TakeMoney = ({total, handleCheckout, products, history}) => {
  const dispatch = useDispatch()
  
  const { userInfo } = useSelector((state) => state.userLogin)

  const handleToken = async (token) =>  {
    if(userInfo) {
      dispatch({type: ORDER_PAY_REQUEST})
      const response = await axios.post(
        "api/orders/stripecheckout",
        { token, products }
      );
      const { status, address, recipient, paymentMethod, paymentResult, error } = response.data;
      if (status === "success") {
        handleCheckout(address, recipient, paymentMethod, paymentResult)
        dispatch({type: ORDER_PAY_SUCCESS})
        // toast("Success! Check email for details", { type: "success" });
      } else {
        // toast("Something went wrong", { type: "error" });
        dispatch({type: ORDER_PAY_FAIL, payload: error })
        setTimeout(() => dispatch({type: ORDER_PAY_RESET}), 2000)
      }
    } else {
      history.push('/login?redirect=cart')
    }
  }

  return (
    <div>
      <StripeCheckout
        token={handleToken}
        billingAddress
        shippingAddress
        amount={total * 100}
        name="Auto Pars Order"
        stripeKey="pk_test_51I6dCcBxSq4757fM5xbrRDOCchQI8e2TORqleN6nkHoLHHHr4rKLSgPt25nPsESGmPk7LhqeUzvI1ibjT2sh8nV200cIozOeDf"
      />
    </div>
  )
}

export default TakeMoney