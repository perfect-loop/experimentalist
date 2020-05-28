import React, { ReactText } from "react";
import { useAuth0 } from "../../util/react-auth0-spa";
import "./Header.css";
import { UserInfo } from "./UserInfo";
import { API_DOMAIN } from "../../util/config";

const NavBar = () => {
  const auth0 = useAuth0();
  const isAuthenticated = auth0.isAuthenticated;
  const logout = auth0.logout;
  const userProfile = auth0.user;
  // const user = new User(userProfile);
  const user = auth0.user;

  return (
    <div>
      {!isAuthenticated && (
        <>
          <a className="btn btn-primary" href={`http://${API_DOMAIN}/api/auth/login`}>
            Login
          </a>
        </>
      )}
      {isAuthenticated && user && <UserInfo user={user} logout={logout} />}
    </div>
  );
};

export default NavBar;
