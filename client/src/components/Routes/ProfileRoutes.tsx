import React from "react";
import { Route } from "react-router-dom";
import Profile from "../Profile";
import NewProfile from "../Profile/New/NewProfile";
import Edit from "../Profile/Edit";

export const ProfileRoutes: React.FC = () => {
  return (
    <>
      <Route exact path="/profile/new">
        <NewProfile />
      </Route>
      <Route exact path="/profile/edit">
        <Edit />
      </Route>
      <Route exact path="/profile">
        <Profile />
      </Route>
    </>
  );
};
