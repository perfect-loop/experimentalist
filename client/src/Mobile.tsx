import React from "react";
import { Grid, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  mobileImg: {
    width: "100%",
    maxWidth: "640px"
  },
});
export function Mobile() {
  const classes = useStyles();
  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid item xs={9}>
        <img className={classes.mobileImg} src="/images/mobile.jpeg" alt="Logo" />
        <Typography variant="h3">Device not supported</Typography>
        <Typography variant="h5">Please visit the website on your desktop or laptop computer.</Typography>
      </Grid>
    </Grid>
  );
}
