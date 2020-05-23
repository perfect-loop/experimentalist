import React from "react";
import NavBar from "./components/NavBar";
import VideoConference from "./components/VideoConference";
import { useAuth0 } from "./util/react-auth0-spa";

const App: React.FC = () => {
  const { isInitializing, isAuthenticated, user } = useAuth0();

  if (isInitializing) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <header>
        <NavBar />
      </header>
      <VideoConference />
    </div>
  );
};

export default App;
