import React from "react";
import CancelIcon from "@material-ui/icons/Cancel";
import { Typography } from "@material-ui/core";

export const Error = () => {
  return (
    <>
      <Typography align="center">
        <CancelIcon style={{ fontSize: 70, color: "red" }} />
      </Typography>
      <Typography variant="h6" color="textPrimary" component="p" align="center">
        Error
      </Typography>
      <Typography variant="body1" color="textPrimary" component="p" align="center">
        Please contact customer support
      </Typography>
    </>
  );
};
