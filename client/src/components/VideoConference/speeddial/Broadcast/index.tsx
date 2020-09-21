import React from "react";
import { createStyles, Theme, withStyles, WithStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import BroadcastDialog from "./BroadcastDialog";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

export default function Broadcast(props: { handleBroadcastClickClose: any; defaultOpen: boolean; eventId: string }) {
  return (
    <div>
      <Dialog
        onClose={props.handleBroadcastClickClose}
        aria-labelledby="customized-dialog-title"
        open={props.defaultOpen}
      >
        <DialogTitle id="customized-dialog-title" onClose={props.handleBroadcastClickClose}>
          Send message to all participants
        </DialogTitle>
        <DialogContent dividers>
          <BroadcastDialog onClose={props.handleBroadcastClickClose} eventId={props.eventId} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
