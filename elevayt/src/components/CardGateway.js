import React, {useState} from "react";
import {BasicModal} from "./Materials";
import PaymentForm from "./Stripe";
import PaymentCard from "./PaymentCard";
import { paymentChoice } from "../data/payment";
import ChatBot from "./ChatBot";
import GooglePay from "./GooglePay";
import ApplePayButton from "./ApplePay";

const ProductForm = () => {
  const initialValues = {
    currency: "",
    amount: "",
    product: "",
  };


  const [open, setOpen] = React.useState(false);
  const [market, setMarket] = useState(initialValues);
  
  const divStyle = {
    width: "98%",
    display: "flex",
    flexDirection: "row",
    padding: "40px",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: "20px",
    flexWrap: "wrap",

  };
  
  console.log(market);
  
  return (
    <div style={divStyle}>
      {paymentChoice.slice(0).map((choice, index) => (
        <PaymentCard
          key={index}
          mode={choice.mode}
          packages={choice.packages}
          monthlyAmount={choice.monthlyAmount}
          yearlyAmount={choice.yearlyAmount}
          currency={choice.currency}
          openModal={setOpen}
          setMarket={setMarket}
        />
      ))}

      <BasicModal
        openModal={setOpen}
        open={open}
        value={<PaymentForm cost={market} />}
      />
      <GooglePay />
      <ApplePayButton payment={market} />
      <ChatBot />
    </div>
  );
};

export default ProductForm;
