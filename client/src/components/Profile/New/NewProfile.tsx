import React from "react";
import { makeStyles, Theme, createStyles, Button, Typography, Hidden } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import { Form, Field } from "react-final-form";
import ProfileStore from "../storage/ProfileStore";
import { IProfile } from "models/Profiles";
import { useHistory } from "react-router-dom";
import { Alert, AlertTitle } from "@material-ui/lab";
import TextFieldAdapter from "../../Forms/TextFieldAdapter";
import { useAuth0 } from "../../../util/react-auth0-spa";
import { Api } from "models/Socket";
import VenmoSearch from "../New/VenmoSearch";

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
    buttons: {
      padding: theme.spacing(1),
      "& button": {
        margin: theme.spacing(0.5),
      },
    },
  }),
);

function NewProfile(props: {}) {
  const classes = useStyles();
  const history = useHistory();
  const [alertText, setAlertText] = React.useState("");
  const [alert, setAlert] = React.useState(false);
  const { updateProfile } = useAuth0();
  const [venmoHandle, setVenmoHandle] = React.useState("");
  const [venmoId, setVenmoId] = React.useState("");
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

  const setVenmoHandleAndId = (venmoHandle: string, venmoId: string) => {
    setVenmoHandle(venmoHandle);
    setVenmoId(venmoId);
  };

  return (
    <Paper elevation={4} className={classes.paper}>
      {alert && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {alertText}
        </Alert>
      )}
      <Typography variant="h6">Fill in your profile</Typography>
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
                name="venmoHandle"
                component={TextFieldAdapter}
                type="text"
                label="Venmo Handle"
                required={true}
                defaultValue={venmoHandle}
                InputProps={{
                  readOnly: true,
                }}
                placeholder="Venmo Handle"
              />
              <VenmoSearch setVenmoHandle={setVenmoHandleAndId} />
            </div>
            <Hidden lgDown={true} implementation="css">
              <Field
                name="venmoId"
                component={TextFieldAdapter}
                type="text"
                label="Venmo Id"
                defaultValue={venmoId}
                required={true}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Hidden>
            <div className={classes.buttons}>
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
