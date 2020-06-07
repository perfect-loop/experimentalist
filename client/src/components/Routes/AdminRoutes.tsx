import React from "react";
import { Route } from "react-router-dom";
import VideoConference from "../VideoConference";
import { Role } from "../VideoConference/ConferenceView";

export const AdminRoutes: React.FC = () => {
  return (
    <Route exact path="/admin/events/:id/conference">
      <VideoConference role={Role.Host} />
    </Route>
  );
};
