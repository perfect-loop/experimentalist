import React, { useEffect } from "react";
import { Theme, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import { DialogTitleWithClose } from "../../../Forms/DialogTitleWithClose";
import StatsCard from "./ConferenceStats";
import { useAppContext } from "../../../../context/AppContext";
import { Api } from "models/Socket";

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

export default function ConferenceStats() {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [numParticipants, setNumParticipants] = React.useState<number>(0);
  const app = useAppContext();

  useEffect(() => {
    console.log("Setting up connections");
    app.socket.on(Api.Socket.EVENT_PARTICIPATION_UPDATE, (response: Api.Socket.IEventParticipationMessage) => {
      console.log(`Api.Socket.EVENT_PARTICIPATION_UPDATE response is ${JSON.stringify(response)}`);
      setNumParticipants(response.participant);
    });
  }, []); // https://gosink.in/react-js-how-to-render-useeffect-only-once/

  return (
    <div>
      <EqualizerIcon onClick={handleClickOpen} />
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitleWithClose id="customized-dialog-title" onClose={handleClose}>
          Conference Statistics
        </DialogTitleWithClose>
        <DialogContent dividers>
          <StatsCard numParticipants={numParticipants} />
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
