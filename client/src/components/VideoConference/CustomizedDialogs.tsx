import React from "react";
import { createStyles, Theme, withStyles, WithStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import Typography from "@material-ui/core/Typography";
import MenuBook from "@material-ui/icons/MenuBook";
import { IParticipation } from "api/Participations";
import { useAppContext } from "../../context/AppContext";
import { Api } from "api/Socket";
import { IEvent } from "api/Events";
import MUIRichTextEditor from "mui-rte";
import { DialogTitleWithClose } from "../Forms/DialogTitleWithClose";
import Alert from "@material-ui/lab/Alert";

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

export default function CustomizedDialogs(props: { participant: IParticipation }) {
  const app = useAppContext();
  const [open, setOpen] = React.useState(false);
  const [eventActive, setEventActive] = React.useState(props.participant.event.state === "active");
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  app.socket.on(Api.Socket.EVENT_UPDATED_NAME, (response: { event: IEvent }) => {
    setEventActive(response.event.state === "active");
    setOpen(response.event.state === "active");
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
              <Alert severity="success">
                To access the experiment in a new tab, click this link{" "}
                <a target="_blank" href={props.participant.instructions} rel="noopener noreferrer">
                  {props.participant.instructions}
                </a>
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
