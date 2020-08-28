import React from "react";
import { Theme, Button, makeStyles, Typography, ButtonGroup } from "@material-ui/core";
import VenmoStorage from "./storage/VenmoSearchStorage";
import RedoIcon from "@material-ui/icons/Redo";
import HelpIcon from "@material-ui/icons/Help";

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

interface IProps {
  venmoStorage: VenmoStorage;
  setVenmoHandle: (venmoHandle: string, venmoId: string) => void;
}

export const NotFound: React.FC<IProps> = props => {
  const classes = useStyles();
  const reset = () => {
    props.venmoStorage.restart();
    console.log(props.venmoStorage.failedAttempts());
  };

  const submit = () => {
    props.setVenmoHandle("", "");
    props.venmoStorage.restart();
  };

  return (
    <>
      <Typography variant="h6" color="textPrimary" component="p" align="center">
        User not found
      </Typography>
      <div className={classes.root}>
        <ButtonGroup>
          <Button variant="contained" onClick={reset}>
            <RedoIcon style={{ fontSize: 30, color: "red" }} />
            Try Again
          </Button>
        </ButtonGroup>
        {props.venmoStorage.failedAttempts() >= 2 && (
          <ButtonGroup>
            <Button variant="contained" onClick={submit}>
              <HelpIcon style={{ fontSize: 30, color: "green" }} />I really don't know
            </Button>
          </ButtonGroup>
        )}
      </div>
    </>
  );
};
