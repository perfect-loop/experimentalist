import React from "react";
import { Route, Switch } from "react-router-dom";
import Show from "../Events/Show";
import Index from "../Events/Participants";
import EventsIndex from "../Events/Index/";
import Unavailable from "../Events/Unavailable";
import Verify from "../Events/Verify";
import NewDialog from "../EventSettings/New/NewDialog";
import Settings from "../EventSettings/Show";

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
        path="/events/:eventId/host/settings"
        component={(props: any) => {
          return (
            <>
              <Settings eventId={props.match.params.eventId} />
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
      <Route
        exact
        path="/events/:id/host/settings/new"
        component={(props: any) => {
          return (
            <>
              <NewDialog eventId={props.match.params.id} />
            </>
          );
        }}
      />
      <Route
        exact
        path="/events/:id/verify/:participationId"
        component={(props: any) => {
          return (
            <>
              <Verify participationId={props.match.params.participationId} eventId={props.match.params.id} />
            </>
          );
        }}
      />
      path="/events/:id/conference"
    </Switch>
  );
};
