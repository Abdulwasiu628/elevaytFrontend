/*eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import GooglePay from "./GooglePay";
import ApplePayButton from "./ApplePay";
import { url, postApis } from "../data/getApis";
import PropTypes from "prop-types";


function PaymentForm({cost}) {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    postApis("https://elevayt.onrender.com/stripe/create-payment-intent", cost)
      .then((result) => {
        setClientSecret(result.clientSecret);
      })
      .catch((err) => {
        return err;
      });
    console.log(clientSecret);
    setProcessing(true);
    console.log(clientSecret);
    console.log(elements.getElement(CardElement));
    try {
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        // Handle payment failure
        console.error(result.error.message);
      } else {
        // Handle successful payment
        console.log("Payment successful!");
      }
    } catch (error) {
      console.error(error);
    }

    setProcessing(false);
  };

  const style = {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    width: "95%",
    justifyContent: "center",
    alignItems: "center",
  };
  const divStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "50px",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20px",
  };
  const cardStyle = {
    width: "95%",
    display: "flex",
    flexDirection: "column",
  };
  
  return (
    <div style={divStyle}>
      <form onSubmit={handleSubmit} style={style}>
        <div style={cardStyle}>
          <center>
            <label htmlFor="card-info">Payment Info</label>
          </center>
          <CardElement
            id="card-info"
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#32325d",
                  width: "40px",
                },
              },
            }}
            // onChange={handlePaymentMethodChange}
          />
        </div>

        <div className="payment-buttons">
          <button type="submit" disabled={!stripe || processing}>
            {processing ? "Processing..." : "Pay"}
          </button>
        </div>
        <GooglePay />
        <ApplePayButton payment={cost} />
      </form>
    </div>
  );
}
PaymentForm.propTypes = {
  cost: PropTypes.object.isRequired
};
export default PaymentForm;
