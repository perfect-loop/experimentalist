import React from "react";
import { Route, useLocation } from "react-router-dom";
import Settings from "../Events/Settings";
import Show from "../Events/Show";
import Events from "../Events";
import Index from "../Events/Participants";
import VideoConference from "../VideoConference";
import PersistentDrawerLeft from "../PersistentDrawerLeft";
import { Role } from "../VideoConference/ConferenceView";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export const EventRoutes: React.FC = () => {
  const query = useQuery();
  return (
    <>
      <PersistentDrawerLeft>
        <Route
          exact
          path="/events/:id/participants"
          component={(props: any) => {
            return (
              <>
                <Index eventId={props.match.params.id} />
              </>
            );
          }}
        />
        <Route
          exact
          path="/events/:id/settings"
          component={(props: any) => {
            return (
              <>
                <Settings id={props.match.params.id} />
              </>
            );
          }}
        />
        <Route
          exact
          path="/events/:id"
          component={(props: any) => {
            return (
              <>
                <Show id={props.match.params.id} />
              </>
            );
          }}
        />
        <Route exact path="/events/">
          <Events />
        </Route>
      </PersistentDrawerLeft>
      <Route exact path="/events/:id/conference">
        {query.get("role") === "host" && <VideoConference role={Role.Host} />}
        {query.get("role") !== "host" && <VideoConference role={Role.Attendee} />}
      </Route>
    </>
  );
};
