import React from "react";
import NavBar from "./components/NavBar";
import VideoConference, { Role } from "./components/VideoConference";
import { useAuth0 } from "./util/react-auth0-spa";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

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
          <Route path="/event/conference">
            <VideoConference role={Role.Attendee} user={user} />
          </Route>
          <Route path="/admin/event/conference">
            <VideoConference role={Role.Host} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
