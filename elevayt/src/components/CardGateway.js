import React, {useState, useEffect} from "react";
import { getCurrencyCodes } from "../data/getApis";
import {BasicModal} from "./Materials";
import PaymentForm from "./Stripe";
const ProductForm = () => {
  const initialValues = {
    currency: "",
    amount: "",
    product: "",
  };

  const [codes, setCodes] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [market, setMarket] = useState(initialValues);
  const [form, getForm] = useState(null);

  useEffect(() => {
    getCurrencyCodes().then((result) => {
      setCodes(result);
      console.log(result);
    });
  }, []);
  
  const style = {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    width: "40%",
    marginTop: "100px",
    marginLeft: "250px",
    gap: "17px",
    boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.5)",
    padding: "20px"
  };
  const inputStyle = {
    height: "40px",
    width:"95%",
    outline: "none",
    backgroundColor: "whitesmoke",
    border: "none",
    borderRadius: "6px",
    paddingLeft: "15px",
  };
  const buttonStyle = {
    height: "40px",
    width: "99%",
    outline: "none",
    backgroundColor: "purple",
    border: "none",
    borderRadius: "6px",
    color: "white"
  };
  const handleOpen = () => {
    if(market.currency.trim() !== "" && market.amount !== "" ){
      console.log(market);
      getForm(market);
      setMarket(initialValues);
    }
    setOpen(true);

  };
  
  const handleChange = (event) => {
    const {name, value} = event.target;
    setMarket((prevmarket) => ({
      ...prevmarket,
      [name]:value
    }));

  };
  const handleSelect = (event) => {
    const selectedCurrency = event.target.value;
    // Update the state of market.currency
    setMarket({ ...market, currency: selectedCurrency });
  };

  return (
    <div style={style}>
      <label htmlFor="Product">Product Name: </label>
      <input
        type="text"
        placeholder="product"
        name="product"
        value={market.product}
        onChange={handleChange}
        style={inputStyle}
      />
      <label htmlFor="Product">Amount: </label>
      <input
        type="number"
        placeholder="amount"
        name="amount"
        value={market.amount}
        onChange={handleChange}
        style={inputStyle}
      />
      <label htmlFor="Price">Currency: </label>
      <select
        style={inputStyle}
        value={market.currency}
        onChange={handleSelect}
      >
        {codes &&
          Object.entries(codes).map(([key, value]) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
      </select>
      <button onClick={handleOpen} style={buttonStyle}>
        Submit to Pay
      </button>

      <BasicModal
        openModal={setOpen}
        open={open}
        value={<PaymentForm cost={form} />}
      />
    </div>
  );
};

export default ProductForm;
