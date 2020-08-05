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
          <Typography variant="h4">
            We do not support your browser, please use{" "}
            <a
              href="https://support.google.com/chrome/answer/95346?co=GENIE.Platform%3DDesktop&hl=en"
              target="_blank"
              rel="noopener noreferrer"
            >
              Chrome
            </a>{" "}
            or{" "}
            <a href="https://www.mozilla.org/en-US/exp/firefox/new/" target="_blank" rel="noopener noreferrer">
              Firefox
            </a>
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default UnsupportedBrowser;
