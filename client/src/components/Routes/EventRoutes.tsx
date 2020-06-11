import React from "react";
import { Route, useLocation } from "react-router-dom";
import Settings from "../Events/Settings";
import Show from "../Events/Show";
import Events from "../Events";
import Index from "../Events/Participants";
import VideoConference from "../VideoConference";
import PersistentDrawerLeft from "../PersistentDrawerLeft";
import { Role } from "../VideoConference/ConferenceView";
import FirstPage from "../FirstPage";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export const EventRoutes: React.FC = () => {
  const query = useQuery();
  return (
    <>
      <PersistentDrawerLeft>
        <Route exact path="/">
          <FirstPage />
        </Route>
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
      <Route
        exact
        path="/events/:id/conference"
        component={(props: any) => {
          return (
            <>
              {query.get("role") === "host" && <VideoConference role={Role.Host} eventId={props.match.params.id} />}
              {query.get("role") !== "host" && <VideoConference role={Role.Attendee} eventId={props.match.params.id} />}
            </>
          );
        }}
      />
      <Route
        path="*"
        component={(props: any) => {
          return <>404 - Invalid Page</>;
        }}
      />
    </>
  );
};
