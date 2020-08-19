import React from "react";
import PaymentButton from "../../components/Compensation/PayPal/PaymentButton";

export default {
  title: "PayPal",
};

export const PayPalPaymentButton = () => {
  return (
    <div>
      <PaymentButton email="ilyakatz@gmail.com" value={2} />
    </div>
  );
};
