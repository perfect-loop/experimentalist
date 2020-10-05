import React from "react";
import { Auth0User } from "../../util/react-auth0-spa";
import IndeObserverVideoConferencex from "./ObserverVideoConference";
import { Api } from "models/Socket";
import { Snackbar, makeStyles, Theme, createStyles } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useAppContext } from "../../context/AppContext";
import { Role } from "models/Zoom";
import PersistenNotication from "./notifications/Persistent";
import { IParticipation } from "models/Participations";
import { ZoomMtg } from "@zoomus/websdk";
import { IEventSettings } from "models/EventSettings";
import { useEffect } from "react";

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
  user: Auth0User;
  hostParticition?: IParticipation;
  attendeeParticipation?: IParticipation;
  eventSettings: IEventSettings;
}

enum Severity {
  S = "success",
  W = "warning",
}

const VideoConference = (props: IProps) => {
  const app = useAppContext();

  const [snackOpen, setSnackOpen] = React.useState(false);
  const [showFab, setShowFab] = React.useState(false);
  const [snackText, setsnackText] = React.useState("");
  const [persistentText, setPersistentText] = React.useState("");
  const [persistentOpen, setPersistentOpen] = React.useState(false);
  const [snackSeverity, setSnackSeverity] = React.useState(Severity.S);

  const classes = useStyles();

  useEffect(() => {
    app.socket.on(Api.Socket.EVENT_UPDATED_NAME, (response: any) => {
      // console.log(`message from server is ${response.data}`);
      setsnackText("This event is now active!");
      setSnackSeverity(Severity.S);

      // this is a backup plan in case FAB did not appear for the user for some reason
      setShowFab(true);
      setSnackOpen(true);
    });

    app.socket.on(Api.Socket.EVENT_BROADCAST_NAME, (response: Api.Socket.IBroadcastMessage) => {
      console.log(`message from server using ${Api.Socket.EVENT_BROADCAST_NAME} is ${JSON.stringify(response)}`);
      if (props.eventId === response.eventId) {
        setPersistentText(response.message);
        setPersistentOpen(true);
      }
    });

    console.log(`props.attendeeParticipation is ${JSON.stringify(props.attendeeParticipation)}`);
    const participationId = props.attendeeParticipation?._id || props.hostParticition?._id;
    if (participationId) {
      const message: Api.Socket.IJoinEventMessage = {
        eventId: props.eventId,
        participationId: participationId,
      };
      Api.Socket.joinEvent(app.socket, message);
    }
  }, []);

  const handleClose = () => {
    setPersistentOpen(false);
  };

  const autoAdmitParticipants = () => {
    app.socket.on(Api.Socket.EVENT_ADMIT_PARTICIPANT, (response: Api.Socket.IEventAdmitParticipant) => {
      console.log(`[VideoConference] received ${Api.Socket.EVENT_ADMIT_PARTICIPANT} with`, response);
      const userId = response.userId;
      ZoomMtg.putOnHold({
        userId,
        hold: false, // take user out of waiting room
        success: function(res: any) {
          console.log(res);
        },
      });
    });
  };

  if (props.hostParticition) {
    autoAdmitParticipants();
  }

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
      <IndeObserverVideoConferencex
        hostParticipation={props.hostParticition}
        attendeeParticipation={props.attendeeParticipation}
        user={props.user}
        role={props.role}
        eventId={props.eventId}
        showFab={showFab}
      />
    </>
  );
};

export default VideoConference;
