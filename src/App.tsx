import React from "react";
import NavBar from "./components/NavBar";
import VideoConference from "./components/VideoConference";
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
          <Route path="/video">
            <VideoConference />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
