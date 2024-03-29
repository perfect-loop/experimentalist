import React from "react";
import { Theme, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import Typography from "@material-ui/core/Typography";
import MenuBook from "@material-ui/icons/MenuBook";
import { IParticipation } from "models/Participations";
import { useAppContext } from "../../../../context/AppContext";
import { Api } from "models/Socket";
import { IEvent } from "models/Events";
import MUIRichTextEditor from "mui-rte";
import { DialogTitleWithClose } from "../../../Forms/DialogTitleWithClose";
import Alert from "@material-ui/lab/Alert";
import SyncIcon from "@material-ui/icons/Sync";
import EventStore from "../../../Events/storage/EventStore";
import { Link } from "@material-ui/core";

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function InstructionsAction(props: { participant: IParticipation }) {
  const app = useAppContext();
  const [open, setOpen] = React.useState(false);
  const [eventActive, setEventActive] = React.useState(props.participant.event.state === "active");
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const eventStore = new EventStore();
  const checkEvent = () => {
    const eventId = props.participant.event._id;
    console.log(`Checking if event ${eventId} is active`);
    eventStore
      .get(eventId)
      .then(event => {
        setEventActive(event.state === "active");
        setOpen(event.state === "active");
      })
      .catch(err => {
        console.log(`Error occured ${err}`);
      });
  };

  app.socket.on(Api.Socket.EVENT_UPDATED_NAME, (response: { event: IEvent }) => {
    console.log(
      `CustomizedDialogs] Message from server using ${Api.Socket.EVENT_UPDATED_NAME} is ${JSON.stringify(response)}`,
    );
    if (props.participant.event._id === response.event._id) {
      setEventActive(response.event.state === "active");
      setOpen(response.event.state === "active");
    }
  });

  app.socket.on("disconnect", (reason: string) => {
    console.log(`Socket disconnected ${reason}`);
    if (reason === "io server disconnect") {
      console.log("Socket disconnected from server, will attempts to reconnect");
      // the disconnection was initiated by the server, you need to reconnect manually
      app.socket.connect();
    }
    // else the socket will automatically try to reconnect
  });

  app.socket.on("error", (error: any) => {
    console.log(`Socketr error ${JSON.stringify(error)}`);
  });

  return (
    <div>
      <MenuBook onClick={handleClickOpen} />
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitleWithClose id="customized-dialog-title" onClose={handleClose}>
          {props.participant.event.title}
        </DialogTitleWithClose>
        <DialogContent dividers>
          <MUIRichTextEditor defaultValue={props.participant.event.instructions} readOnly controls={[]} />
          {eventActive && (
            <Typography gutterBottom>
              <Alert severity="warning">
                To access the experiment in a new tab, click this link{" "}
                <a target="_blank" href={props.participant.instructions} rel="noopener noreferrer">
                  {props.participant.instructions}
                </a>
              </Alert>
            </Typography>
          )}
          {!eventActive && (
            <Typography gutterBottom>
              <Alert severity="warning">
                <div>Link to experiment is not yet available</div>
                <Link style={{ cursor: "pointer" }}>
                  <div onClick={checkEvent}>
                    Check Now <SyncIcon />
                  </div>
                </Link>
              </Alert>
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
