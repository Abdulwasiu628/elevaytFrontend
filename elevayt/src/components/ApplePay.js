import React, { useEffect, useState } from "react";
import { useStripe, useElements, PaymentRequestButtonElement } from "@stripe/react-stripe-js";
import PropTypes from "prop-types";
import { postApis } from "../data/getApis";

const ApplePayButton = ({ payment }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [paymentRequest, setPaymentRequest] = useState("");

  useEffect(() => {
    if (!stripe || !elements) {
      return;
    }
    const pr = stripe.paymentRequest({
      currency: "usd",
      country: "US",
      requestPayerEmail: true,
      requestPayerName: true,
      total: {
        label: "Total Amount",
        amount: Number(payment.amount) || 0.0,
      },
    });
    pr.canMakePayment()
      .then((result) => {
        if (result) {
          setPaymentRequest(pr);
        }
      })
      .catch((err) => {
        if (err) {
          console.log("Error:", err);
        }
      });

    pr.on("paymentmethod", async (e) => {
      postApis(
        "https://elevayt.onrender.com/stripe/create-payment-intent",
        payment
      )
        .then((result) => {
          const { clientSecret } = result; // Get the clientSecret from the result
          console.log(clientSecret);
          setClientSecret(clientSecret);
          return stripe.confirmCardPayment(
            clientSecret,
            {
              payment_method: e.paymentMethod.id,
            },
            {
              handleActions: false,
            }
          );
        })
        .then(({ error, paymentIntent }) => {
          if (error) {
            e.complete("fail");
            console.log("fail");
          } else {
            e.complete("success");
            if (paymentIntent.status === "requires_action") {
              stripe.confirmCardPayment(clientSecret);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
    
  }, [stripe, elements, payment]);
  if(paymentRequest){
    return <PaymentRequestButtonElement options={{paymentRequest}} />;
  }
  return (
    <button>Apple pay</button>
  );

};

ApplePayButton.propTypes = {
  payment: PropTypes.object,
};

export default ApplePayButton;
