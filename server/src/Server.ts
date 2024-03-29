import cookieParser from "cookie-parser";
import morgan from "morgan";
import path from "path";
import helmet from "helmet";

import express, { Request, Response, NextFunction } from "express";
import { BAD_REQUEST } from "http-status-codes";
import "express-async-errors";

import logger from "./shared/Logger";
import * as Sentry from "@sentry/node";

// Init express
const app = express();

/************************************************************************************
 *                             Error Tracking
 * The request handler must be the first middleware on the app
 ***********************************************************************************/
app.use(Sentry.Handlers.requestHandler() as express.RequestHandler);
/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Show routes called in console during development
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Security
if (process.env.NODE_ENV === "production") {
  app.use(helmet());
}

// Print API errors
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.message, err);
  return res.status(BAD_REQUEST).json({
    error: err.message
  });
});

/******************
 *   Passport
 ******************/

import mongoose from "mongoose";
import session from "express-session";
import connectMongo from "connect-mongo";
import passport from "./passport/setup";
import auth from "./routes/auth";
import user from "./routes/users";
import profile from "./routes/profile";
import venmo from "./routes/venmo";
import events from "./routes/events";
import eventSettings from "./routes/eventsSettings";
import attendance from "./routes/attendance";
import participants from "./routes/participants";
import healthcheck from "./routes/healthcheck";
import compensation from "./routes/compensations";
import zoom from "./routes/zoom";
import devRoutes from "./routes/development";

const MONGO_URI = process.env.MONGO_URL || "";
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true })
  .catch((err: any) => console.log(err));

// Bodyparser middleware, extended false does not allow nested payloads
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/************************************************************************************
 *                              CORS
 *  Needed for storybook
 ***********************************************************************************/
import cors from "cors";
if (process.env.NODE_ENV == "development") {
  app.use(cors());
}
/************************************************************************************
 *                              HTTPS
 ***********************************************************************************/
if (process.env.NODE_ENV != "development") {
  app.enable("trust proxy");
  app.use(function(req, res, next) {
    if (req.secure) {
      // request was via https, so do no special handling
      next();
    } else {
      const redirectTo = "https://" + req.headers.host + req.url;
      console.log(`Redirecting to ${redirectTo}`);
      // request was via http, so redirect to https
      res.redirect(redirectTo);
    }
  });
}

const MongoStore = connectMongo(session);

app.use(
  session({
    secret: process.env.SESSION_SECRET || "session secret",
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//
import userInViews from "./lib/middleware/userInViews";
app.use(userInViews());

// Routes
app.use("/api/auth", auth);
app.use("/", user);
app.use("/api", attendance);
app.use("/api", events);
app.use("/api", eventSettings);
app.use("/api", participants);
app.use("/api", healthcheck);
app.use("/api", zoom);
app.use("/api", profile);
app.use("/api", venmo);
if (process.env.NODE_ENV === "development") {
  app.use("/api", devRoutes);
}
app.use("/api", compensation);

/************************************************************************************
 *                              Serve front-end content
 ***********************************************************************************/

const staticDir = path.join(__dirname, "public");
app.use(express.static(staticDir));
// this is a catch all so must be done last

if (process.env.NODE_ENV != "development") {
  app.get("*", (req: Request, res: Response) => {
    res.sendFile("index.html", { root: staticDir });
  });
}
/************************************************************************************
 *                              Development
 ***********************************************************************************/
import routeList from "express-routes-catalogue";

if (process.env.NODE_ENV === "development") {
  routeList.web(app, "/route-list");
  app.get("*", (req: Request, res: Response) => {
    res.redirect("/route-list");
  });
}

// in case html needs to be served by the server
const viewsDir = path.join(__dirname, "views");
app.set("views", viewsDir);
app.set("view engine", "pug");

/************************************************************************************
 *                             Error Tracking
 * The error handler must be before any other error middleware and after all controllers
 ***********************************************************************************/
Sentry.init({
  dsn:
    "https://6f3e52ab8656444b9e762560bffa8b85@o56372.ingest.sentry.io/5310821"
});
app.use(Sentry.Handlers.errorHandler() as express.ErrorRequestHandler);

// Export express instance
export default app;

// tslint:disable-next-line:max-line-length
