import React from "react";
import { Auth0Context } from "../util/react-auth0-spa";

export const MockProvider = (props: any) => {
  return (
    <Auth0Context.Provider
      value={{
        user: {},
        isAuthenticated: props.isAuthenticated,
        isInitializing: true,
        isPopupOpen: false,
        hasDetailedProfile: true,
        // @ts-ignore
        loginWithPopup: () => {},
        // @ts-ignore
        handleRedirectCallback: () => {},
        // @ts-ignore
        getIdTokenClaims: () => {},
        // @ts-ignore
        loginWithRedirect: () => {},
      }}
    >
      {props.children}
    </Auth0Context.Provider>
  );
};