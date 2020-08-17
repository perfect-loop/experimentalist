import React from "react";
import { Route, useLocation, Switch, useHistory } from "react-router-dom";
import PersistentDrawerLeft from "../PersistentDrawerLeft";
import FirstPage from "../FirstPage";
import { EventManagementRoutes } from "./EventManagementRoutes";
import { CatchAllRoute } from "./CatchAllRoute";
import { Role } from "models/Zoom";
import { ProfileRoutes } from "./ProfileRoutes";
import { CompensationRoutes } from "./CompensationRoutes";
import { useAuth0 } from "../../util/react-auth0-spa";
import Conference from "../Events/Conference";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export const EventRoutes: React.FC = () => {
  const query = useQuery();
  const { isAuthenticated, hasDetailedProfile } = useAuth0();
  const history = useHistory();
  const location = useLocation();

  if (isAuthenticated && !hasDetailedProfile && location.pathname !== "/profile/new") {
    history.push("/profile/new");
  }

  return (
    <>
      <Switch>
        <Route
          exact
          path="/events/:id/conference"
          component={(props: any) => {
            return (
              <>
                {(query.get("role") === "host" || query.get("role") === "assistant") && (
                  <Conference role={Role.Host} eventId={props.match.params.id} />
                )}
                {query.get("role") !== "host" && query.get("role") !== "assistant" && (
                  <Conference role={Role.Attendee} eventId={props.match.params.id} />
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
          <CompensationRoutes />
          <ProfileRoutes />
        </PersistentDrawerLeft>
        <CatchAllRoute />
      </Switch>
    </>
  );
};
