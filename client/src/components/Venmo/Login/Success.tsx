import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { Typography } from "@material-ui/core";

export const Success = () => {
  return (
    <>
      <Typography align="center">
        <CheckCircleIcon style={{ fontSize: 70, color: "green" }} />
      </Typography>
      <Typography variant="h6" color="textPrimary" component="p" align="center">
        Verification complete
      </Typography>
      <Typography variant="body1" color="textPrimary" component="p" align="center">
        You can now make payments.
      </Typography>
    </>
  );
};
