import React, { SyntheticEvent } from "react";
import { makeStyles, Theme, createStyles, TextField, Button } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import { Form, Field } from "react-final-form";
import EventStore from "../storage/EventStore";
import { IEvent } from "api/Events";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
    paper: {
      width: "400px",
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

  const onSubmit = (values: any) => {
    const newEvent = values as IEvent;
    const eventStore = new EventStore();
    eventStore.post(newEvent).then((event: IEvent) => {
      history.push(`/events/${event._id}/participants`);
    });
  };

  // const history = useHistory();
  return (
    <Paper elevation={4} className={classes.paper}>
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
                defaultValue="2020-06-15T19:00"
                placeholder="Start Time"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300,
                }}
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
            <pre>{JSON.stringify(values)}</pre>
          </form>
        )}
      />
    </Paper>
  );
}

export default NewDialog;