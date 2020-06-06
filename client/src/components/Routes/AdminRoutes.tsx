import React from "react";
import { Route } from "react-router-dom";
import VideoConference, { Role } from "../VideoConference";

export const AdminRoutes: React.FC = () => {
  return (
    <Route exact path="/admin/events/:id/conference">
      <VideoConference role={Role.Host} />
    </Route>
  )
}