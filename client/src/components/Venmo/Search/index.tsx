import React from "react";
import VenmoSearchStorage from "./storage/VenmoSearchStorage";
import InnerForm from "./InnerForm";

interface IProps {
  setVenmoHandle: (venmoHandle: string, venmoId: string) => void;
}

const VenmoSearch = (props: IProps) => {
  const [storage] = React.useState(new VenmoSearchStorage());
  return <InnerForm storage={storage} setVenmoHandle={props.setVenmoHandle} />;
};

export default VenmoSearch;
