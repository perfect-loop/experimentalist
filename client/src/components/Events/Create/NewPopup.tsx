import React from "react";
import { createStyles, Theme, withStyles, WithStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import NewDialog from "../NewForm/NewDialog";

const styles = (theme: Theme) =>
  createStyles({
    title: {
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

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.title} {...other}>
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

const MyDialog = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
    width: "100%",
  },
  paper: {
    "max-width": "800px",
    width: "800px",
    height: "600px",
  },
}))(Dialog);

export default function NewPopup({ defaultOpen = false }) {
  const history = useHistory();
  const [open] = React.useState(defaultOpen);

  const handleClose = () => {
    history.push("/events/");
  };

  return (
    <div>
      <MyDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Create New
        </DialogTitle>
        <DialogContent dividers>
          <NewDialog />
        </DialogContent>
      </MyDialog>
    </div>
  );
}
