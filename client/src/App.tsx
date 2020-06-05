import React from "react";
import NavBar from "./components/NavBar";
import VideoConference, { Role } from "./components/VideoConference";
import { useAuth0 } from "./util/react-auth0-spa";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Events from "./components/Events";
import Floaty from "./components/Events/Floaty";
import Show from "./components/Events/Show";
import Settings from "./components/Events/Settings";
import Index from "./components/Events/Participants";

const App: React.FC = () => {
  const { isInitializing, user } = useAuth0();

  if (isInitializing) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="App">
        <header>
          <NavBar />
        </header>
        <Switch>
        <Route
            exact
            path="/events/:id/participants"
            component={(props: any) => {
              return (
                <>
                  <Index eventId={props.match.params.id} />
                  <Floaty />
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
                  <Floaty />
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
                  <Floaty />
                </>
              );
            }}
          />
          <Route exact path="/events/">
            <Events />
            <Floaty />
          </Route>
          <Route exact path="/events/:id/conference">
            <VideoConference role={Role.Attendee} user={user} />
          </Route>
          <Route exact path="/admin/events/:id/conference">
            <VideoConference role={Role.Host} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
