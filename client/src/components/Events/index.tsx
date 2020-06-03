import React from "react"
import { useAuth0 } from "../../util/react-auth0-spa";
import New from "./New";
import EventsStore from "./storage/EventsStore.ts";
import Index from "./Index/index";

const Events = () => {
  return (
    <div>
      <Index />
      <New />
    </div>
  );
};

export default Events;