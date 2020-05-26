import React, { ReactText } from "react";
import { useAuth0 } from "../../util/react-auth0-spa";
import "./Header.css";
import { UserInfo } from "./UserInfo";

const NavBar = () => {
  const auth0 = useAuth0();
  const isAuthenticated = auth0.isAuthenticated;
  const loginWithRedirect = auth0.loginWithRedirect;
  const logout = auth0.logout;
  // const userProfile = auth0.user;
  // const user = new User(userProfile);
  const user = auth0.user;

  return (
    <div>
      {!isAuthenticated && (
        <button className="btn btn-primary" onClick={() => loginWithRedirect({})}>
          Log in
        </button>
      )}
      {isAuthenticated && user && <UserInfo user={user} logout={logout} />}
    </div>
  );
};

export default NavBar;
