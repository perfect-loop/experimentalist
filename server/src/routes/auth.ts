// var express = require('express');
// var router = express.Router();
// var passport = require('passport');
// var dotenv = require('dotenv');
// var util = require('util');
// var url = require('url');
// var querystring = require('querystring');

import express from "express";
const router = express.Router();
import passport from "passport";
import dotenv from "dotenv";
import util from "util";
import url from "url";
import querystring from "querystring";

dotenv.config();

// Perform the login, after login Auth0 will redirect to callback
router.get(
  "/login",
  passport.authenticate("auth0", {
    scope: "openid email profile",
  }),
  (req, res) => {
    res.redirect("/");
  },
);

// Perform the final stage of authentication and redirect to previously requested URL or '/user'
router.get("/callback", (req, res, next) => {
  console.log("Got callback");
  passport.authenticate("auth0", (err, user, info) => {
    console.log(`Authenticated with info ${JSON.stringify(info)}`);
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect("/login");
    }
    req.logIn(user, (error: any) => {
      if (err) {
        return next(error);
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      const returnTo = req.session.returnTo;
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      delete req.session.returnTo;
      res.redirect(returnTo || process.env.AUTH0_LOGIN_DEFAULT_RETURN_TO);
    });
  })(req, res, next);
});

// Perform session logout and redirect to homepage
router.get("/logout", (req, res) => {
  req.logout();

  const returnTo = process.env.AUTH0_LOGOUT_RETURN_TO;
  const logoutURL = new url.URL(util.format("https://%s/v2/logout", process.env.AUTH0_DOMAIN));
  const searchString = querystring.stringify({
    // eslint-disable-next-line @typescript-eslint/camelcase
    client_id: process.env.AUTH0_CLIENT_ID,
    returnTo,
  });
  logoutURL.search = searchString;

  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  res.redirect(logoutURL);
});

export default router;
