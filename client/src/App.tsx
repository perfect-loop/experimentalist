import React from "react";
import { useAuth0 } from "./util/react-auth0-spa";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { EventRoutes } from "./components/Routes/EventRoutes";
import { AdminRoutes } from "./components/Routes/AdminRoutes";
import PersistentDrawerLeft from "./components/PersistentDrawerLeft";

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
          <Route
            path="*"
            component={(props: any) => {
              return <>404 - Invalid Page</>;
            }}
          />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
