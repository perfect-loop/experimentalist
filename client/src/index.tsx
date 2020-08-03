// src/index.js

import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { Auth0Provider } from "./util/react-auth0-spa";
import history from "./util/history";
import { AUTH0_DOMAIN, AUTH0_CLIENT_ID } from "./util/config";
import App from "./App";
import * as Sentry from "@sentry/browser";
import { FlagsProvider } from "flagged";
import { BrowserView, MobileView } from "react-device-detect";
import { Mobile } from "./Mobile";

// A function that routes the user to the right place
// after login
const onRedirectCallback = (appState: any) => {
  history.push(appState && appState.targetUrl ? appState.targetUrl : window.location.pathname);
};

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_URL,
  environment: process.env.NODE_ENV,
});

ReactDOM.render(
  <>
    <BrowserView>
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
    </BrowserView>
    <MobileView>
      <Mobile />
    </MobileView>
  </>,

  document.getElementById("root"),
);

serviceWorker.unregister();
