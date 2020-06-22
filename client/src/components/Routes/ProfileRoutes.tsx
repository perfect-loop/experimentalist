import React from "react";
import { Route } from "react-router-dom";
import Profile from "../Profile";

export const ProfileRoutes: React.FC = () => {
  return (
    <>
      <Route exact path="/profile">
        <Profile />
      </Route>
    </>
  );
};
