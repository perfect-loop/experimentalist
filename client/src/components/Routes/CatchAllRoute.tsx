import React from "react";
import { Route } from "react-router-dom";

export const CatchAllRoute: React.FC = () => {
  return (
    <Route
      path="*"
      component={(props: any) => {
        return <>404 - Invalid Page</>;
      }}
    />
  );
};
