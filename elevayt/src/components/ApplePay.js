import React, {useEffect, useState } from "react";
import { useStripe, useElements, PaymentRequestButtonElement } from "@stripe/react-stripe-js";
import PropTypes from "prop-types";
const ApplePayButton = ({payment}) => {
  
  const stripe = useStripe();
  const elements = useElements();
  const [paymentRequest, setPaymentRequest] = useState("");
  console.log("payment ", payment.currency.toLowerCase());
  useEffect(() => {
    // Include the Apple Pay button using the Apple Pay JS API
    
    if(!stripe || !elements){
      return;
    }
    const paymentRequest = {
      currency: "usd",
      country: "US",
      requestPayerEmail: true,
      requestPayerName: true,
      total: {
        label: "Total Amount",
        amount: Number(payment.amount) || 0.00,
      },
    };
    const pr = stripe.paymentRequest(paymentRequest);
    pr.canMakePayment().then((result) => {
      if(result){
        setPaymentRequest(pr);
      }
    }).catch((err) => {
      if(err){
        console.log("Error:", err);
      }
    });
  }, [stripe, elements]);
    
  
  

  return (
    <div>
      {
        paymentRequest && <PaymentRequestButtonElement options={{paymentRequest}}/>
      }
      
    </div>
  );
};

ApplePayButton.propTypes = {
  payment: PropTypes.object
};
export default ApplePayButton;
