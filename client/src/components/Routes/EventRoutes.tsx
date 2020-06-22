import React from "react";
import { Route, useLocation, Switch } from "react-router-dom";
import VideoConference from "../VideoConference";
import PersistentDrawerLeft from "../PersistentDrawerLeft";
import FirstPage from "../FirstPage";
import { EventManagementRoutes } from "./EventManagementRoutes";
import { CatchAllRoute } from "./CatchAllRoute";
import { Role } from "api/Zoom";
import { ProfileRoutes } from "./ProfileRoutes";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export const EventRoutes: React.FC = () => {
  const query = useQuery();
  return (
    <>
      <Switch>
        <Route
          exact
          path="/events/:id/conference"
          component={(props: any) => {
            return (
              <>
                {query.get("role") === "host" && <VideoConference role={Role.Host} eventId={props.match.params.id} />}
                {query.get("role") !== "host" && (
                  <VideoConference role={Role.Attendee} eventId={props.match.params.id} />
                )}
              </>
            );
          }}
        />
        <PersistentDrawerLeft>
          <Route exact path="/">
            <FirstPage />
          </Route>
          <EventManagementRoutes />
          <ProfileRoutes />
        </PersistentDrawerLeft>
        <CatchAllRoute />
      </Switch>
    </>
  );
};
