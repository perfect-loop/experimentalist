import React from "react";
import {
  Theme,
  createStyles,
  WithStyles,
  withStyles,
  Typography,
  IconButton,
  Dialog,
  Button,
  Avatar,
  makeStyles,
} from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import CloseIcon from "@material-ui/icons/Close";
import VenmoLogin from "../../Venmo/Login";
import { useFeature } from "flagged";

const useStyles = makeStyles({
  avatar: {
    width: 30,
    height: 30,
  },
});

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
    width: "500px",
    height: "530px",
  },
}))(Dialog);

export default function VenmoLoginPopup({ defaultOpen = false }) {
  const venmoLogin = useFeature("venmoLogin");
  const classes = useStyles();
  const [open, setOpen] = React.useState(defaultOpen);
  const onClose = () => {
    setOpen(false);
  };

  const onClick = () => {
    setOpen(true);
  };

  if (!venmoLogin) {
    return <></>;
  }

  return (
    <div>
      <Button color="primary" variant="contained" onClick={onClick}>
        <Avatar
          alt="Venmo Logo"
          className={classes.avatar}
          src="https://cdn1.venmo.com/marketing/images/branding/venmo-icon.svg"
        />
        Venmo Login
      </Button>
      <MyDialog aria-labelledby="customized-dialog-title" open={open} onClose={onClose}>
        <DialogTitle id="customized-dialog-title" onClose={onClose}>
          Venmo
        </DialogTitle>
        <DialogContent dividers>
          <VenmoLogin />
        </DialogContent>
      </MyDialog>
    </div>
  );
}
