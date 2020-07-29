import React from "react";
import InnerForm from "../components/Venmo/Login/InnerForm";
import VenmoStorage from "../components/Venmo/Login/storage/VenmoStorage";

export default {
  title: "Venmo Login",
};

export const VenmoUsernamePassword = () => {
  const storage = new VenmoStorage();
  return (
    <div>
      <InnerForm storage={storage} />
    </div>
  );
};

export const Venmo2FA = () => {
  const storage = new VenmoStorage();
  storage.state = {
    kind: "2fa_requested",
  };
  return (
    <div>
      <InnerForm storage={storage} />
    </div>
  );
};

/* eslint-disable @typescript-eslint/camelcase */
export const VenmoMethods = () => {
  const storage = new VenmoStorage();
  storage.state = {
    kind: "methods",
    methods: [
      {
        top_up_role: "none",
        used_in_scheduled_repayment: false,
        default_transfer_destination: "none",
        fee: undefined,
        last_four: undefined,
        id: "917461989851136694",
        assets: undefined,
        peer_payment_role: "default",
        name: "Venmo balance",
        image_url: undefined,
        type: "balance",
      },
      {
        top_up_role: "eligible",
        default_transfer_destination: "default",
        fee: undefined,
        last_four: "2925",
        id: "2743423975030784319",
        assets: {
          detail:
            "https://d1v6x81qdeozhc.cloudfront.net/static/images/payment-methods/banks/generic/detail-c518476b60d2c89687a205d90a636056.jpg",
          thumbnail:
            "https://d1v6x81qdeozhc.cloudfront.net/static/images/payment-methods/banks/generic/thumbnail-978f2064e3d7a01dfffd765f39c085f2.jpg",
        },
        name: "Ally Bank Personal Checking",
        image_url: "",
        type: "bank",
        peer_payment_role: "none",
      },
      {
        top_up_role: "eligible",
        used_in_scheduled_repayment: false,
        default_transfer_destination: "eligible",
        fee: undefined,
        last_four: "0467",
        id: "972731533230080701",
        assets: {
          detail:
            "https://d1v6x81qdeozhc.cloudfront.net/static/images/payment-methods/banks/chase/detail-9b44d834e43bc9cba693ba02fbb00514.jpg",
          thumbnail:
            "https://d1v6x81qdeozhc.cloudfront.net/static/images/payment-methods/banks/chase/thumbnail-434978f5375782aaaeacb3e60b2c043b.jpg",
        },
        peer_payment_role: "backup",
        name: "Jpmorgan Chase Personal Checking",
        image_url: "/static/images/banklogos/chase.png",
        type: "bank",
      },
      {
        top_up_role: "none",
        used_in_scheduled_repayment: false,
        default_transfer_destination: "none",
        fee: {
          variable_percentage: 3,
          fixed_amount: undefined,
        },
        last_four: "1000",
        id: "3063630211842048694",
        assets: {
          detail_network_logo:
            "https://d1v6x81qdeozhc.cloudfront.net/static/images/payment-methods/cards/american_express/detail_network_logo-f85271783dae7094171cac20d2373369.jpg",
          thumbnail:
            "https://d1v6x81qdeozhc.cloudfront.net/static/images/payment-methods/cards/american_express/thumbnail-b46ef60db18200503c5f7283566488ca.jpg",
        },
        peer_payment_role: "backup",
        name: "American Express Credit",
        image_url: undefined,
        type: "card",
      },
    ],
  };
  return (
    <div>
      <InnerForm storage={storage} />
    </div>
  );
};
/* eslint-enable @typescript-eslint/camelcase */

export const VenmoComplete = () => {
  const storage = new VenmoStorage();
  storage.state = {
    kind: "done",
  };
  return (
    <div>
      <InnerForm storage={storage} />
    </div>
  );
};

export const VenmoError = () => {
  const storage = new VenmoStorage();
  storage.state = {
    kind: "error",
  };
  return (
    <div>
      <InnerForm storage={storage} />
    </div>
  );
};
