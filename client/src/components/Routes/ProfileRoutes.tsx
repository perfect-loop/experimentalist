import React from "react";
import { Route } from "react-router-dom";
import Profile from "../Profile";
import NewProfile from "../Profile/New/NewProfile";

export const ProfileRoutes: React.FC = () => {
  return (
    <>
      <Route exact path="/profile/new">
        <NewProfile />
      </Route>
      <Route exact path="/profile">
        <Profile />
      </Route>
    </>
  );
};
