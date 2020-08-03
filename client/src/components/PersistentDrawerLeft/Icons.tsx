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
      <Typography variant="caption" className={classes.copyright} color="textSecondary">
        © 2020 Perfect Loop Technologies LLC
      </Typography>
    </>
  );
}
