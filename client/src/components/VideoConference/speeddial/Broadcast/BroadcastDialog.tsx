import React, { SyntheticEvent } from "react";
import { makeStyles, Theme, createStyles, TextField, Button } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import { Form, Field } from "react-final-form";
import { useAppContext } from "../../../../context/AppContext";
import { Api } from "api/Socket";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "80%",
      },
    },
    paper: {
      width: "400px",
    },
    input: {
      width: "200",
    },
  }),
);

const TextFieldAdapter = ({ input, meta, ...rest }: { input: any; meta: any }) => {
  return (
    <TextField
      {...input}
      {...rest}
      onChange={(event: SyntheticEvent) => {
        const target = event.target as HTMLTextAreaElement;
        const value = target.value;
        console.log(`value is ${value}`);
        input.onChange(value);
      }}
      errorText={meta.touched ? meta.error : ""}
    />
  );
};

function BroadcastDialog(props: { onClose: () => void }) {
  const classes = useStyles();
  const app = useAppContext();

  const onSubmit = (values: any) => {
    app.socket.emit(Api.Socket.EVENT_BROADCAST_NAME, values.message);
    props.onClose();
  };

  return (
    <Paper elevation={4} className={classes.paper}>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit} className={classes.root}>
            <div>
              <Field
                name="message"
                component={TextFieldAdapter}
                multiline
                rows={4}
                type="Message"
                label="Message"
                required={true}
                placeholder="Send message to all participants"
              />
            </div>
            <div className="buttons">
              <Button variant="contained" disabled={submitting} onSubmit={onSubmit} type="submit" color="primary">
                Send
              </Button>
            </div>
          </form>
        )}
      />
    </Paper>
  );
}

export default BroadcastDialog;
