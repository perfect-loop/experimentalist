import React from "react";
import AuthenticatedIcons from "./AuthenticatedIcons";
import UnAuthenticatedIcons from "./UnAuthenticatedIcons";
import { Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  copyright: {
    bottom: 0,
    position: "absolute",
    margin: "10px",
  },
});

export default function Icons(props: any) {
  const classes = useStyles();
  return (
    <>
      <AuthenticatedIcons />
      <UnAuthenticatedIcons />
      <div className={classes.copyright}>
        <Typography variant="caption" color="textSecondary">
          © 2020 Perfect Loop Technologies LLC
        </Typography>
        <div/>
        <Typography variant="caption">
          <a href="https://perfectloop.ladesk.com/023791-Terms-and-Conditions" target="_blank" rel="noopener noreferrer">Terms and Conditions</a>
        </Typography>
      </div>
    </>
  );
}
