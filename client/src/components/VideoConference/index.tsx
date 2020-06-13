import React from "react";
import { Role } from "./ConferenceView";
import { useAuth0 } from "../../util/react-auth0-spa";
import IndeObserverVideoConferencex from "./ObserverVideoConference";
import { Api } from "api/Socket";
import { Snackbar, makeStyles, Theme, createStyles } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useAppContext } from "../../context/AppContext";

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

const VideoConference = (props: IProps) => {
  const auth0 = useAuth0();
  const app = useAppContext();

  const isAuthenticated = auth0.isAuthenticated;
  const user = auth0.user;

  const [snackOpen, setSnackOpen] = React.useState(false);
  const classes = useStyles();
  app.socket.on(Api.Socket.EVENT_UPDATED_NAME, (response: any) => {
    // console.log(`message from server is ${response.data}`);
    setSnackOpen(true);
  });

  if (!isAuthenticated || !user) {
    return <>Not allowed</>;
  } else {
    return (
      <>
        <div>
          <Snackbar
            autoHideDuration={4000}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            open={snackOpen}
            onClose={() => {
              setSnackOpen(false);
            }}
            key={"nokey"}
          >
            <Alert severity="success" className={classes.alert}>
              This event is now active!
            </Alert>
          </Snackbar>
        </div>
        <IndeObserverVideoConferencex user={user} role={props.role} eventId={props.eventId} />
      </>
    );
  }
};

export default VideoConference;
