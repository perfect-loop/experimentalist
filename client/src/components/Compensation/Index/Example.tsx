import React from "react";
import Alert from "@material-ui/lab/Alert";
import { Typography, Paper } from "@material-ui/core";
import NotesIcon from "@material-ui/icons/Notes";
import { ACCEPTED_CURRENCIES } from "models/Helpers";

interface Props {
  paymentMethod: string;
}

const Example: React.SFC<Props> = ({ paymentMethod }) => (
  <Paper>
    <Alert icon={<NotesIcon />} severity="success">
      <Typography gutterBottom>
        To upload list of compensation for participants, create a CSV file with two columns
      </Typography>
      <Typography display="block" gutterBottom variant="subtitle2">
        email, amount, currency
      </Typography>
      <Typography display="block" gutterBottom variant="subtitle2">
        {paymentMethod === "venmo"
          ? "Please note that USD is the only accepted currency"
          : `Accepted currencies are ${ACCEPTED_CURRENCIES}.`}
      </Typography>
      <Typography>
        Click <a href="/samples/compensations.csv">here</a> to download sample file
      </Typography>
    </Alert>
  </Paper>
);

export default Example;
