import React from "react";
import { Theme, withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogContent from "@material-ui/core/DialogContent";
import { useHistory } from "react-router-dom";
import NewDialog from "../NewForm/NewDialog";
import { DialogTitle } from "../../Forms/CustomDialogTitle";

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
