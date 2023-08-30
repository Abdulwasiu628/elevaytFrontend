import React, {useEffect, useState } from "react";
import { useStripe, useElements, PaymentRequestButtonElement } from "@stripe/react-stripe-js";

function ApplePayButton() {
  
  const stripe = useStripe();
  const elements = useElements();
  const [paymentRequest, setPaymentRequest] = useState("");
  useEffect(() => {
    // Include the Apple Pay button using the Apple Pay JS API
    useEffect(() => {
      if(!stripe || !elements){
        return;
      }
      const paymentRequest = {
        countryCode: "US",
        currencyCode: "USD",
        requestPayerEmail: true,
        requestPayerName: true,
        total: {
          label: "Total Amount",
          amount: "10.00",
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
    
  
  }, []);

  return (
    <div>
      {
        paymentRequest && <PaymentRequestButtonElement options={{paymentRequest}}/>
      }
      
    </div>
  );
}

export default ApplePayButton;
