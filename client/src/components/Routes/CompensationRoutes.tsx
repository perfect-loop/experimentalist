import React from "react";
import { Route } from "react-router-dom";
import Compensation from "../Compensation/index";

export const CompensationRoutes: React.FC = () => {
  return (
    <>
      <Route exact path="/compensation"> 
        <Compensation />
      </Route>
    </>
  );
};


