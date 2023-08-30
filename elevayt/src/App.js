import React from "react";
import "./App.css";
import ChatRoom from "./components/ChatRoom";
//import Stripe from "./components/Stripe";
import ProductForm from "./components/CardGateway";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_9SI24YHAZLk81yaQORdZItFZ00zEySjiTY");

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/chat" element={<ChatRoom />} />
          <Route path="/stripe" element={<StripeWrapper />} />
        </Routes>
      </Router>
    </div>
  );
}

function StripeWrapper() {
  return (
    <Elements stripe={stripePromise}>
      <ProductForm />
    </Elements>
  );
}

export default App;
