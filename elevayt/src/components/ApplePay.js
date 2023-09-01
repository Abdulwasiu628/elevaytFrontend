import React, {useEffect, useState } from "react";
import { useStripe, useElements, PaymentRequestButtonElement } from "@stripe/react-stripe-js";
import PropTypes from "prop-types";
import { postApis } from "../data/getApis";
const ApplePayButton = ({payment}) => {
  
  const stripe = useStripe();
  const elements = useElements();
  const [paymentRequest, setPaymentRequest] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  console.log("payment ", payment.currency.toLowerCase());
  useEffect(() => {
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
    pr.on("paymentmethod", async(e) => {
      postApis("https://elevayt.onrender.com/stripe/create-payment-intent", payment)
        .then((result) => {
          setClientSecret(result.clientSecret);
        })
        .catch((err) => {
          return err;
        });
      const {error, paymentIntent} = await stripe.confirmCardPayment(clientSecret, {
        payment_method: e.paymentMethod.id
      },
      {
        handleActions: false
      }
      );
      if(error){
        e.complete("fail");
      }
      e.complete("success");
      if(paymentIntent.status == "requires_action"){
        stripe.confirmCardPayment(clientSecret);
      }
    });
  }, [stripe, elements]);
    
  
  

  return (
    <div>
      {
        paymentRequest && <PaymentRequestButtonElement options={{paymentRequest}} />
      }
      
    </div>
  );
};

ApplePayButton.propTypes = {
  payment: PropTypes.object
};
export default ApplePayButton;
