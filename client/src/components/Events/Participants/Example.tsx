import React from "react";
import Alert from "@material-ui/lab/Alert";
import { Typography, Paper } from "@material-ui/core";
import NotesIcon from "@material-ui/icons/Notes";

export function Example(): JSX.Element {
  return (
    <>
      <Paper>
        <Alert icon={<NotesIcon />} severity="success">
          <Typography gutterBottom>To upload list of participants, create a CSV file with two columns</Typography>
          <Typography display="block" gutterBottom variant="subtitle2">
            email, link
          </Typography>
          <Typography>
            Click <a href="/samples/participants.csv">here</a> to download sample file
          </Typography>
        </Alert>
      </Paper>
    </>
  );
}
