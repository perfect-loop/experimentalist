import React from "react";
import { makeStyles, Theme, createStyles, Button, InputLabel, MenuItem } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import { Form, Field } from "react-final-form";
// import EventStore from "../storage/EventStore";
import { IProfile } from "api/Profiles";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { Alert, AlertTitle } from "@material-ui/lab";
import TextFieldAdapter from "../../Forms/TextFieldAdapter";
import SelectAdapter from "../../Forms/SelectAdapter";
import { STATES } from "./states";

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
    select: {
      margin: theme.spacing(1),
      width: "80%",
    },
  }),
);

function NewProfile(props: {}) {
  const classes = useStyles();
  const history = useHistory();
  // const [alert, setAlert] = React.useState(false);

  const onSubmit = (values: any) => {
    const newProfile = values as IProfile;
    console.log(newProfile);
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
                label="Last Name"
                required={true}
                placeholder="Last Name"
              />
            </div>
            <div>
              <Field
                name="venmoId"
                component={TextFieldAdapter}
                type="text"
                label="Venmo Id"
                required={true}
                placeholder="Venmo Id"
              />
            </div>
            <div>
              <Field
                name="studentId"
                component={TextFieldAdapter}
                type="text"
                label="Student Id"
                required={true}
                placeholder="Student Id"
              />
            </div>
            <div>
              <Field
                name="phone"
                component={TextFieldAdapter}
                type="text"
                label="Last Name"
                required={true}
                placeholder="Last Name"
              />
            </div>
            <div>
              <Field
                name="street"
                component={TextFieldAdapter}
                type="text"
                label="Street"
                required={true}
                placeholder="Street"
              />
            </div>
            <div>
              <Field name="state" className={classes.select} component={SelectAdapter} label="State" required={true} options={STATES}/>
            </div>
            <div>
              <Field
                name="zip"
                component={TextFieldAdapter}
                type="number"
                label="Zip"
                required={true}
                placeholder="Zip"
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

export default NewProfile;
