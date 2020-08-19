import React from "react";
import { useAuth0 } from "../../util/react-auth0-spa";
import { Redirect } from "react-router-dom";
import { Paper, makeStyles, Theme, createStyles, Button, Typography } from "@material-ui/core";
import { API_DOMAIN } from "../../util/config";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      paddingTop: "40px",
      width: "100%",
      minHeight: "400px",
      textAlign: "center",
    },
    terms: {
      display: "block",
      marginTop: "10px",
    },
  }),
);

const FirstPage = () => {
  const classes = useStyles();
  const auth0 = useAuth0();
  const isAuthenticated = auth0.isAuthenticated;
  const hasProfile = auth0.hasDetailedProfile;

  if (isAuthenticated) {
    if (hasProfile) {
      return <Redirect to="/events" />;
    } else {
      return <Redirect to="/profile/new" />;
    }
  } else {
    return (
      <Paper elevation={1} className={classes.paper}>
        <img height="200" src="/images/logo.png" alt="Logo" />
        <div />
        <a href={`${API_DOMAIN}/api/auth/login`}>
          <Button color="primary" variant="contained">
            Log in
          </Button>
        </a>
        <Typography variant="caption" className={classes.terms}>
          By signing up, you agree to our{" "}
          <a
            href="https://perfectloop.ladesk.com/023791-Terms-and-Conditions"
            target="_blank"
            rel="noopener noreferrer"
          >
            terms of service
          </a>
          .
        </Typography>
      </Paper>
    );
  }
};

export default FirstPage;
