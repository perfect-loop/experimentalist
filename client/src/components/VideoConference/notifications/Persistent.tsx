import React from "react";
import { Snackbar, makeStyles, Theme, createStyles } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    alert: {
      width: "300px",
    },
  }),
);

const PersistenNotication = (props: { open: boolean; text: string }) => {
  const [snackOpen, setSnackOpen] = React.useState(props.open);

  console.log(`PersistenNotication: snackOpen is ${snackOpen}`);
  console.log(`PersistenNotication: props.open is ${props.open}`);

  const classes = useStyles();
  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={props.open}
        onClose={() => {
          setSnackOpen(false);
        }}
        key={"Persistent Notification"}
      >
        <Alert severity="warning" className={classes.alert}>
          {props.text}
        </Alert>
      </Snackbar>
    </>
  );
};

export default PersistenNotication;
