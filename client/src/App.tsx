import React from "react";
import { useAuth0 } from "./util/react-auth0-spa";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { EventRoutes } from "./components/Routes/EventRoutes";

const App: React.FC = () => {
  const { isInitializing } = useAuth0();

  if (isInitializing) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="App">
        <Switch>
          <EventRoutes />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
