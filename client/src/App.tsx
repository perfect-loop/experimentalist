import React from "react";
import { useAuth0 } from "./util/react-auth0-spa";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { EventRoutes } from "./components/Routes/EventRoutes";
import "./App.css";
import FullStory from "react-fullstory";
import { FULLSTORY_CODE } from "./util/config";
import { Offline } from "react-detect-offline";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

const App: React.FC = () => {
  const { isInitializing } = useAuth0();

  if (isInitializing) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="App">
        {FULLSTORY_CODE && <FullStory org={FULLSTORY_CODE} />}
        <Offline>
          <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} open={true} autoHideDuration={6000}>
            <Alert severity="error">Your internet connection is unstable</Alert>
          </Snackbar>
        </Offline>
        <Switch>
          <EventRoutes />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
