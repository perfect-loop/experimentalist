import React from "react";
import { useAuth0 } from "../../util/react-auth0-spa";
import { AUTH0_CLIENT_ID } from "../../util/config";
import "./Header.css";

const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  return (
    <div>
      {!isAuthenticated && <button onClick={() => loginWithRedirect({})}>Log in</button>}
      {isAuthenticated && user && (
        <>
          <img width="20px" alt="profile" src={user.picture} />
          <div>Logged in as {JSON.stringify(user.nickname)}</div>
          <button
            onClick={() =>
              logout({
                returnTo: "http://localhost:3001/",
                // eslint-disable-next-line @typescript-eslint/camelcase
                client_id: AUTH0_CLIENT_ID,
              })
            }
          >
            Log out
          </button>
        </>
      )}
    </div>
  );
};

export default NavBar;
