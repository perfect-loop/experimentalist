import React from "react";
import VenmoStorage from "./storage/VenmoStorage";
import InnerForm from "./InnerForm";

const VenmoLogin = (props: {}) => {
  const [storage] = React.useState(new VenmoStorage());
  return <InnerForm storage={storage} />;
};

export default VenmoLogin;
