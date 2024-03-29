import React from "react";
import { Route } from "react-router-dom";
import AdminCompensation from "../Compensation/Index/AdminCompensations";
import UserCompensation from "../Compensation/Index/UserCompensation";
import Index from "../Compensation/Index";

export const CompensationRoutes: React.FC = () => {
  return (
    <>
      <Route
        exact
        path="/events/:id/host/compensations/"
        component={(props: any) => {
          return <Index eventId={props.match.params.id} />;
        }}
      />
      <Route
        exact
        path="/events/:id/host/compensations/venmo"
        component={(props: any) => {
          return <AdminCompensation eventId={props.match.params.id} method="venmo" />;
        }}
      />
      <Route
        exact
        path="/events/:id/host/compensations/paypal"
        component={(props: any) => {
          return <AdminCompensation eventId={props.match.params.id} method="paypal" />;
        }}
      />
      <Route
        exact
        path="/events/:id/compensations"
        component={(props: any) => {
          return <UserCompensation eventId={props.match.params.id} />;
        }}
      />
    </>
  );
};
