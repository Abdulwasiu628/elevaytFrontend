import React from "react";
import GooglePayButton from "@google-pay/button-react";
const GooglePay = () => {
  return (
    <GooglePayButton
      environment="TEST"
      paymentRequest={{
        apiVersion: 2,
        apiVersionMinor: 0,
        allowedPaymentMethods: [
          {
            type: "CARD",
            parameters: {
              allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
              allowedCardNetworks: ["AMEX", "DISCOVER", "MASTERCARD", "VISA"],
            },
            tokenizationSpecification: {
              type: "PAYMENT_GATEWAY",
              parameters: {
                gateway: "stripe",
                stripe: {
                  publishableKey: "YOUR_STRIPE_PUBLIC_KEY",
                },
              },
            },
          },
        ],
        merchantInfo: {
          merchantId: "12345678901234567890",
          merchantName: "Demo Merchant",
        },
        transactionInfo: {
          totalPriceStatus: "FINAL",
          totalPriceLabel: "Total",
          totalPrice: "100.00",
          currencyCode: "USD",
          countryCode: "US",
        },
        shippingAddressRequired: false,
        callbackIntents: ["PAYMENT_AUTHORIZATION"],
      }}
      onLoadPaymentData={(paymentRequest) => {
        console.log("load payment data", paymentRequest);
      }}
      onPaymentAuthorized={(paymentData) => {
        console.log("load payment data", paymentData);
        return { transactionState: "SUCCESS" };
      }}
      existingPaymentMethodRequired="false"
      buttonColor="black"
      buttonType="suscribe"
    />
  );
};

export default GooglePay;