import React from "react";
import { PayPalButton } from "react-paypal-button-v2";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  mobileImg: {
    // maxWidth: "25px",
  },
});

const PaymentButton = (props: { email: string; value: number }) => {
  const classes = useStyles();
  return (
    <div className={classes.mobileImg}>
      <PayPalButton
        createOrder={(data: any, actions: any) => {
          return actions.order.create({
            // eslint-disable-next-line @typescript-eslint/camelcase
            purchase_units: [
              {
                amount: {
                  // eslint-disable-next-line @typescript-eslint/camelcase
                  currency_code: "USD",
                  value: props.value,
                },
                payee: {
                  // eslint-disable-next-line @typescript-eslint/camelcase
                  email_address: props.email,
                },
              },
            ],
            // eslint-disable-next-line @typescript-eslint/camelcase
            application_context: {
              // eslint-disable-next-line @typescript-eslint/camelcase
              shipping_preference: "NO_SHIPPING", // default is "GET_FROM_FILE"
            },
          });
        }}
        style={{
          size: "small",
          color: "blue",
        }}
        onApprove={(data: any, actions: any) => {
          // Capture the funds from the transaction
          return actions.order.capture().then(function(details: any) {
            // Show a success message to your buyer
            alert("Transaction completed by " + details.payer.name.given_name);

            // OPTIONAL: Call your server to save the transaction
            // return fetch("/paypal-transaction-complete", {
            //   method: "post",
            //   body: JSON.stringify({
            //     orderID: data.orderID,
            //   }),
            // });
          });
        }}
      />
    </div>
  );
};

export default PaymentButton;
