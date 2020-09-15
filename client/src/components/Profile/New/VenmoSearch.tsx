import React from "react";

import {
  Dialog,
  makeStyles,
  Typography,
  IconButton,
  WithStyles,
  withStyles,
  createStyles,
  Button,
  Avatar,
  Theme,
} from "@material-ui/core";

import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import CloseIcon from "@material-ui/icons/Close";
import VenmoSearch from "../../Venmo/Search";

const useStyles = makeStyles((theme: Theme) => ({
  avatar: {
    width: 30,
    height: 30,
    marginRight: theme.spacing(0.5),
  },
}));

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

interface IProps {
  defaultOpen?: boolean;
  setVenmoHandle: (venmoHandle: string, venmoId: string) => void;
}
export default function VenmoSearchButton({ defaultOpen = false, setVenmoHandle }: IProps) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(defaultOpen);
  const onClose = () => {
    setOpen(false);
  };

  const onClick = () => {
    setOpen(true);
  };

  const setHandleAndClose = (venmoHandle: string, venmoId: string) => {
    setVenmoHandle(venmoHandle, venmoId);
    setOpen(false);
  };

  return (
    <div>
      <Button color="primary" variant="contained" onClick={onClick}>
        <Avatar
          alt="Venmo Logo"
          className={classes.avatar}
          src="https://cdn1.venmo.com/marketing/images/branding/venmo-icon.svg"
        />
        Find Venmo Handle
      </Button>
      <MyDialog aria-labelledby="customized-dialog-title" open={open} onClose={onClose}>
        <DialogTitle id="customized-dialog-title" onClose={onClose}>
          Venmo
        </DialogTitle>
        <DialogContent dividers>
          <VenmoSearch setVenmoHandle={setHandleAndClose} />
        </DialogContent>
      </MyDialog>
    </div>
  );
}
