import React from "react";
import { Route } from "react-router-dom";
import Compensation from "../Compensation/index";
import AdminCompensation from "../Compensation/Index/AdminCompensations"
import UserCompensation from "../Compensation/Index/UserCompensation";

export const CompensationRoutes: React.FC = () => {
  return (
    <>
      <Route exact path="/my/compensations/:id" component={(props: any) => {
        return (
          <AdminCompensation eventId={props.match.params.id} />
        )
      }}/>
      <Route exact path="/compensations/:id" component={(props: any) => {
        return (
          <UserCompensation eventId={props.match.params.id} />
        )
      }}/>
      <Route exact path="/compensations">
        <Compensation />
      </Route>
    </>
  );
};
