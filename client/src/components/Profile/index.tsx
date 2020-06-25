import React from "react";
import Index from "./Index/index";
import { withRouter } from "react-router-dom";
import ProfileStore from "./storage/ProfileStore";

// Pass in push function for updating url in <index> 
const Profile = (props: any) => {
  return (
    <div>
      <Index updateUrl={props.history.push}/>
    </div>
  );
};

export default withRouter(Profile);
