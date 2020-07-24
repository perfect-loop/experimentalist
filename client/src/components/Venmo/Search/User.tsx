import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import { Avatar, Theme, Button, makeStyles, Typography, ButtonGroup } from "@material-ui/core";
import VenmoStorage from "./storage/VenmoSearchStorage";
import { Venmo } from "models/Venmo";
import moment from "moment";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  avatar: {
    marginLeft: "auto",
    marginRight: "auto",
    width: 100,
    height: 100,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export const User = (props: {
  user: Venmo.IVenmoUser;
  venmoStorage: VenmoStorage;
  setVenmoHandle: (venmoHandle: string, venmoId: string) => void;
}) => {
  const classes = useStyles();
  const reset = () => {
    props.venmoStorage.restart();
  };
  const submit = () => {
    props.setVenmoHandle(props.user.username, props.user.id);
    props.venmoStorage.finish();
  };
  const m = moment(props.user.date_joined);
  return (
    <>
      <Typography variant="h6" color="textPrimary" component="p" align="center">
        Is this your Venmo handle?
      </Typography>
      <Typography variant="body1" color="textPrimary" component="p" align="center">
        Name: {props.user.display_name}
      </Typography>
      <Typography variant="body1" color="textPrimary" component="p" align="center">
        Username: {props.user.username}
        <a href={`https://venmo.com/${props.user.username}`} target="_blank" rel="noopener noreferrer">
          <OpenInNewIcon fontSize="small" />
        </a>
      </Typography>
      <Typography variant="body1" color="textPrimary" component="p" align="center">
        Date Joined: {m.format("LL")}
      </Typography>
      <Avatar alt="Venmo Logo" className={classes.avatar} src={props.user.profile_picture_url} />
      <div className={classes.root}>
        <ButtonGroup>
          <Button variant="contained" onClick={submit}>
            <CheckCircleIcon style={{ fontSize: 30, color: "green" }} />
            Yes
          </Button>
          <Button variant="contained" onClick={reset}>
            <CancelIcon style={{ fontSize: 30, color: "red" }} />
            No
          </Button>
        </ButtonGroup>
      </div>
    </>
  );
};
