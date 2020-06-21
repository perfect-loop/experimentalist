import cookieParser from "cookie-parser";
import morgan from "morgan";
import path from "path";
import helmet from "helmet";

import express, { Request, Response, NextFunction } from "express";
import { BAD_REQUEST } from "http-status-codes";
import "express-async-errors";

import logger from "./shared/Logger";

// Init express
const app = express();

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
import events from "./routes/events";
import participants from "./routes/participants";
import healthcheck from "./routes/healthcheck";

let MONGO_URI;

if (process.env.NODE_ENV === "development") {
  const url = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/experiment";
  MONGO_URI = url.replace("development", `dev_${process.env.USER}`);
} else {
  MONGO_URI = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/experiment";
}

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true })
  .catch((err: any) => console.log(err));

// Bodyparser middleware, extended false does not allow nested payloads
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
app.use("/api", events);
app.use("/api", participants);
app.use("/api", healthcheck);

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

// Export express instance
export default app;

// tslint:disable-next-line:max-line-length
