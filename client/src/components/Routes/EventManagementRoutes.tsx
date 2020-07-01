import React from "react";
import { Route, Switch } from "react-router-dom";
import Settings from "../Events/Settings";
import Show from "../Events/Show";
import Index from "../Events/Participants";
import EventsIndex from "../Events/Index/";
import Unavailable from "../Events/Unavailable";

export const EventManagementRoutes: React.FC = () => {
  return (
    <Switch>
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
        path="/events/new/"
        component={(props: any) => {
          return <EventsIndex createDialogOpen={true} />;
        }}
      />
      <Route
        exact
        path="/events/"
        component={(props: any) => {
          return <EventsIndex createDialogOpen={false} />;
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
      <Route
        exact
        path="/events/:id/unavailable"
        component={(props: any) => {
          return (
            <>
              <Unavailable eventId={props.match.params.id} />
            </>
          );
        }}
      />
    </Switch>
  );
};
