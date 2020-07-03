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
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        loginWithPopup: () => {
          console.log("TOD");
        },
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        handleRedirectCallback: () => {
          console.log("TODO");
        },
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        getIdTokenClaims: () => {
          console.log("TODO");
        },
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        loginWithRedirect: () => {
          console.log("TODO");
        },
      }}
    >
      {props.children}
    </Auth0Context.Provider>
  );
};
