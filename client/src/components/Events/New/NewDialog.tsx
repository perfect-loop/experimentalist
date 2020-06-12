import React, { SyntheticEvent } from "react";
import { makeStyles, Theme, createStyles, TextField, Button } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import { Form, Field } from "react-final-form";
import EventStore from "../storage/EventStore";
import { IEvent } from "api/Events";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { Alert, AlertTitle } from "@material-ui/lab";

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

// const NewDialog = () => {
function NewDialog(props: {}) {
  const classes = useStyles();
  const history = useHistory();
  const [alert, setAlert] = React.useState(false);

  const onSubmit = (values: any) => {
    const newEvent = values as IEvent;
    const eventStore = new EventStore();
    eventStore
      .post(newEvent)
      .then((event: IEvent) => {
        history.push(`/events/${event._id}/participants`);
      })
      .catch(error => {
        setAlert(true);
      });
  };

  return (
    <Paper elevation={4} className={classes.paper}>
      {alert && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Unable to create event. Please try again.
        </Alert>
      )}
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit} className={classes.root}>
            <div>
              <Field
                name="title"
                component={TextFieldAdapter}
                type="text"
                label="Event Title"
                required={true}
                placeholder="Event Title"
                defaultValue="Event Title"
              />
            </div>
            <div>
              <Field
                name="startAt"
                component={TextFieldAdapter}
                type="datetime-local"
                label="Start Time"
                required={true}
                className={classes.input}
                defaultValue={moment().format("YYYY-MM-DDThh:mm")}
                placeholder="Start Time"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300,
                }}
              />
            </div>
            <div>
              <Field
                name="instructions"
                component={TextFieldAdapter}
                multiline
                rows={4}
                type="Instructions"
                label="Instructions"
                required={true}
                placeholder="Instructions"
              />
            </div>
            <div className="buttons">
              <Button variant="contained" disabled={submitting} type="submit" color="primary">
                Create
              </Button>
              <Button variant="contained" onClick={form.reset} disabled={submitting || pristine} color="secondary">
                Reset
              </Button>
            </div>
          </form>
        )}
      />
    </Paper>
  );
}

export default NewDialog;
