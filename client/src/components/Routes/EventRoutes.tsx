import React from "react";
import { Route } from "react-router-dom";
import Settings from "../Events/Settings";
import Show from "../Events/Show";
import Events from "../Events";
import Index from "../Events/Participants";

export const EventRoutes: React.FC = () => {
  return (
    <>
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
    </>
  );
}