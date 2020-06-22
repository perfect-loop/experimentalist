import React from "react";
import { useAuth0 } from "../../util/react-auth0-spa";
import IndeObserverVideoConferencex from "./ObserverVideoConference";
import { Api } from "api/Socket";
import { Snackbar, makeStyles, Theme, createStyles } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useAppContext } from "../../context/AppContext";
import { Role } from "api/Zoom";
import PersistenNotication from "./notifications/Persistent";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    alert: {
      width: "300px",
    },
  }),
);

interface IProps {
  role: Role;
  eventId: string;
}

enum Severity {
  S = "success",
  W = "warning",
}

const VideoConference = (props: IProps) => {
  const auth0 = useAuth0();
  const app = useAppContext();

  const isAuthenticated = auth0.isAuthenticated;
  const user = auth0.user;

  const [snackOpen, setSnackOpen] = React.useState(false);
  const [snackText, setsnackText] = React.useState("");
  const [persistentText, setPersistentText] = React.useState("");
  const [persistentOpen, setPersistentOpen] = React.useState(false);
  const [snackSeverity, setSnackSeverity] = React.useState(Severity.S);

  const classes = useStyles();
  app.socket.on(Api.Socket.EVENT_UPDATED_NAME, (response: any) => {
    // console.log(`message from server is ${response.data}`);
    setsnackText("This event is now active!");
    setSnackSeverity(Severity.S);
    setSnackOpen(true);
  });

  app.socket.on(Api.Socket.EVENT_BROADCAST_NAME, (response: any) => {
    console.log(`message from server using ${Api.Socket.EVENT_BROADCAST_NAME} is ${response}`);
    setPersistentText(response);
    setPersistentOpen(true);
  });

  const handleClose = () => {
    setPersistentOpen(false);
  };

  if (!isAuthenticated || !user) {
    return <>Not allowed</>;
  } else {
    return (
      <>
        <div>
          <Snackbar
            autoHideDuration={5000}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            open={snackOpen}
            onClose={() => {
              setSnackOpen(false);
            }}
            key={"nokey"}
          >
            <Alert severity={snackSeverity} className={classes.alert}>
              {snackText}
            </Alert>
          </Snackbar>
          <PersistenNotication open={persistentOpen} text={persistentText} handleClose={handleClose} />
        </div>
        <IndeObserverVideoConferencex user={user} role={props.role} eventId={props.eventId} />
      </>
    );
  }
};

export default VideoConference;
