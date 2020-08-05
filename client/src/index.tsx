// src/index.js

import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import * as Sentry from "@sentry/browser";
import { BrowserView, MobileView } from "react-device-detect";
import BrowserViewWrapper from "./BrowserViewWrapper";
import { Mobile } from "./Mobile";

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_URL,
  environment: process.env.NODE_ENV,
});

ReactDOM.render(
  <>
    <BrowserView>
      <BrowserViewWrapper />
    </BrowserView>
    <MobileView>
      <Mobile />
    </MobileView>
  </>,

  document.getElementById("root"),
);

serviceWorker.unregister();
