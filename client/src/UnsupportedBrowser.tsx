import React from "react";
import { Grid, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    marginTop: "10%",
    textAlign: "center",
  },
  mobileImg: {
    width: "100%",
    maxWidth: "320px",
  },
});

const UnsupportedBrowser = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12}>
          <img className={classes.mobileImg} src="/images/mobile.jpeg" alt="Logo" />
          <Typography variant="h5">
            Your browser is not currently supported, please use{" "}
            <a href="https://www.google.com/chrome/" rel="noopener noreferrer">
              Chrome
            </a>{" "}
            or{" "}
            <a href="https://www.mozilla.org/en-US/exp/firefox/new/" rel="noopener noreferrer">
              Firefox
            </a>
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default UnsupportedBrowser;
