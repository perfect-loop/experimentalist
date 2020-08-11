import React from "react";
import Alert from "@material-ui/lab/Alert";
import { Typography, Paper } from "@material-ui/core";
import NotesIcon from "@material-ui/icons/Notes";

export const Example = () => (
  <Paper>
    <Alert icon={<NotesIcon />} severity="success">
      <Typography gutterBottom>
        To upload list of compensation for participants, create a CSV file with two columns
      </Typography>
      <Typography display="block" gutterBottom variant="subtitle2">
        email, amount
      </Typography>
      <Typography>
        Click <a href="/samples/compensations.csv">here</a> to download sample file
      </Typography>
    </Alert>
  </Paper>
);
