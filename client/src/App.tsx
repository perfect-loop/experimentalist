import React from "react";
import NavBar from "./components/NavBar";
import { useAuth0 } from "./util/react-auth0-spa";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { EventRoutes } from "./components/Routes/EventRoutes";
import { AdminRoutes } from "./components/Routes/AdminRoutes";

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
          <EventRoutes />
          <AdminRoutes />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
