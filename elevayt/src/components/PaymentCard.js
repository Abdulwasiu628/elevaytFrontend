import React, {useState, useRef} from "react";
import PropTypes from "prop-types";
const cardStyle = {
  display: "flex",
  justifyContent: "flex-start",
  alignContent: "flex-start",
  flexDirection: "column",
  width: "30%",
  marginTop: "100px",
  gap: "8px",
  boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.5)",
  padding: "20px 10px 14px 10px",
  overflowY: "hidden",
  borderRadius: "12px",
  height: "310px",
  transition: "all 0.4s linear",
};
const extraStyles = {
  ...cardStyle,
  height: "auto",
  backgroundColor: "whitesmoke",
  border: "solid 2px grey",
};
const listStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  justifyContent: "flex-start",
  alignItems : "flex-start"
};
const buttonStyle = {
  outline: "none",
  backgroundColor: "whitesmoke",
  border: "none",
  borderRadius: "6px",
  color: "purple",
  fontWeight: "700",
  padding: "10px 0px",
  
};
const PaymentCard = ({mode, packages, monthlyAmount, yearlyAmount, currency, openModal, setMarket}) => {
  
  const [getHover, setHover] = useState(false);
  const getMonthlyAmount = useRef("");
  const getYearlyAmount = useRef("");
  const mouseEnterHandler = () => {
    setHover(true);
  };
  const mouseLeaveHandler = () => {
    setHover(false);
  };
  const modalHandler = () => {
    setMarket({
      amount: getMonthlyAmount.current.textContent.split(" ").slice(0,1).join(""),
      currency: "usd"
    });
    openModal(true);
  };
  
  return (
    <div
      style={getHover ? { ...extraStyles } : { ...cardStyle }}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
      onClick={modalHandler}
    >
      <h3>{mode}</h3>
      <ul style={listStyle}>
        {packages.map((element, index) => (
          <li key={index}>{element}</li>
        ))}
      </ul>
      <p style={buttonStyle} ref={getMonthlyAmount}>
        {monthlyAmount} {currency}
      </p>
      <p style={buttonStyle} ref={getYearlyAmount}>
        {yearlyAmount} {currency}
      </p>
    </div>
  );
};

PaymentCard.propTypes = {
  mode: PropTypes.string.isRequired,
  packages: PropTypes.array,
  monthlyAmount: PropTypes.number,
  yearlyAmount: PropTypes.number,
  currency: PropTypes.string,
  openModal: PropTypes.func,
  setMarket: PropTypes.func
};

export default PaymentCard;