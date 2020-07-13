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
