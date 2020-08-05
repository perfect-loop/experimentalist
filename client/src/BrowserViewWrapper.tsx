import React from "react";
import { isChrome, isFirefox } from "react-device-detect";
import { Auth0Provider } from "./util/react-auth0-spa";
import history from "./util/history";
import { AUTH0_DOMAIN, AUTH0_CLIENT_ID } from "./util/config";
import App from "./App";
import { FlagsProvider } from "flagged";
import UnsupportedBrowser from "./UnsupportedBrowser";

// A function that routes the user to the right place
// after login
const onRedirectCallback = (appState: any) => {
  history.push(appState && appState.targetUrl ? appState.targetUrl : window.location.pathname);
};

const BrowserViewWrapper = () =>
  isChrome || isFirefox ? (
    <Auth0Provider
      domain={AUTH0_DOMAIN}
      client_id={AUTH0_CLIENT_ID}
      redirect_uri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      <FlagsProvider features={{ venmoLogin: true }}>
        <App />
      </FlagsProvider>
    </Auth0Provider>
  ) : (
    <UnsupportedBrowser />
  );

export default BrowserViewWrapper;
