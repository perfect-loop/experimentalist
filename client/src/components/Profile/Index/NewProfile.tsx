import React from 'react';
import { makeStyles, Theme, createStyles, Button } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import { Form, Field } from "react-final-form";
// import EventStore from "../storage/EventStore";
import { IProfile } from "api/Profiles";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { Alert, AlertTitle } from "@material-ui/lab";
import TextFieldAdapter from "../../Forms/TextFieldAdapter";

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

function NewProfile(props: {}) {
  const classes = useStyles();
  const history = useHistory();
  // const [alert, setAlert] = React.useState(false);

  const onSubmit = (values: any) => {
    const newProfile = values as IProfile;
    console.log(newProfile)
    // const eventStore = new EventStore();
    // eventStore
    //   .post(newEvent)
    //   .then((event: IEvent) => {
    //     history.push(`/events/${event._id}/participants`);
    //   })
    //   .catch(error => {
    //     setAlert(true);
    //   });
  };

  return (
    <Paper elevation={4} className={classes.paper}>
      {alert && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Unable to create profile. Please try again.
        </Alert>
      )}
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit} className={classes.root}>
            <div>
              <Field
                name="firstName"
                component={TextFieldAdapter}
                type="text"
                label="First Name"
                required={true}
                placeholder="First Name"
              />
            </div>
            <div>
              <Field
                name="lastName"
                component={TextFieldAdapter}
                type="text"
                label="lastName"
                required={true}
                className={classes.input}
                defaultValue={moment().format("YYYY-MM-DDThh:mm")}
                placeholder="lastName"
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
}