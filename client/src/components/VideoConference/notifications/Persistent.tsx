import React from "react";
import { Snackbar, makeStyles, Theme, createStyles, IconButton } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    alert: {
      width: "300px",
    },
  }),
);

const PersistenNotication = (props: { open: boolean; text: string; handleClose: () => void }) => {
  // React.useEffect(() => {
  //   setSnackOpen(props.open);
  //   props.open = false;
  // }, [props.open]);

  // console.log(`PersistenNotication: snackOpen is ${snackOpen}`);
  // console.log(`PersistenNotication: props.open is ${props.open}`);

  const classes = useStyles();
  return (
    <div className="broadcastNotifications">
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={props.open}
        key={"Persistent Notification"}
      >
        <Alert
          severity="warning"
          className={classes.alert}
          action={
            <div>
              <IconButton size="small" aria-label="close" onClick={props.handleClose}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </div>
          }
        >
          {props.text}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default PersistenNotication;
