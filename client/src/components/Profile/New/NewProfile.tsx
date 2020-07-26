import React from "react";
import { makeStyles, Theme, createStyles, Button } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import { Form, Field } from "react-final-form";
import ProfileStore from "../storage/ProfileStore";
import { IProfile } from "api/Profiles";
import { useHistory } from "react-router-dom";
import { Alert, AlertTitle } from "@material-ui/lab";
import TextFieldAdapter from "../../Forms/TextFieldAdapter";
import { useAuth0 } from "../../../util/react-auth0-spa";
import { Api } from "api/Socket";

//PROFILE FORM
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
  const [alertText, setAlertText] = React.useState("");
  const [alert, setAlert] = React.useState(false);
  const { updateProfile } = useAuth0();
  const onSubmit = (values: any) => {
    const newProfile = values as IProfile;
    const profileStore = new ProfileStore();

    profileStore
      .post(newProfile)
      .then((event: IProfile) => {
        console.log("Profile has been created");
        updateProfile(true);
        history.push("/events");
      })
      .catch((error: Api.Error) => {
        setAlertText(error.message);
        setAlert(true);
      });
  };

  return (
    <Paper elevation={4} className={classes.paper}>
      {alert && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {alertText}
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
                placeholder="www.venmo.com/Your-Id"
                required={true}
                label="Venmo Id"
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
                label="Phone"
                required={true}
                placeholder="Phone"
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
