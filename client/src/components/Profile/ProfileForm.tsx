import React from "react";
import { makeStyles, Theme, createStyles, Button } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import { Form, Field } from "react-final-form";
import { IProfile } from "models/Profiles";
import { useHistory } from "react-router-dom";
import { Alert, AlertTitle } from "@material-ui/lab";
import TextFieldAdapter from "../Forms/TextFieldAdapter";
import { useAuth0 } from "../../util/react-auth0-spa";
import { Api } from "models/Socket";
import VenmoSearch from "./New/VenmoSearch";
import { observer } from "mobx-react";

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
    hidden: {
      display: "none",
    },
    buttons: {
      padding: theme.spacing(1),
      "& button": {
        margin: theme.spacing(0.5),
      },
    },
  }),
);

interface IProps {
  onSubmit: (values: any) => Promise<IProfile>;
  afterSuccessPath: string;
  model?: IProfile;
  requireVenmo?: boolean;
}

function ProfileForm(props: IProps) {
  const isShowVenmo = (): boolean => {
    return props.model?.venmoHandle !== undefined || !!props.requireVenmo;
  };

  const allowInitialSubmit = (): boolean => {
    // if this is an update, allow to submit right away
    if (props.model) {
      return true;
    }

    // if venmo is not shown, allow submit right away
    // else, wait for venmo to be entered before allowing submission
    if (!isShowVenmo()) {
      return true;
    }

    return false;
  };

  const classes = useStyles();
  const history = useHistory();
  const [alertText, setAlertText] = React.useState("");
  const [alert, setAlert] = React.useState(false);
  const { updateProfile } = useAuth0();
  const [venmoHandle, setVenmoHandle] = React.useState("");
  const [venmoId, setVenmoId] = React.useState<string | undefined>(undefined);
  const [readyToSubmit, setReadyToSubmit] = React.useState<boolean>(allowInitialSubmit());
  const [showVenmo] = React.useState<boolean>(isShowVenmo());

  const onSubmit = (values: any) => {
    const newProfile = values as IProfile;

    props
      .onSubmit(newProfile)
      .then(() => {
        console.log("Profile has been created");
        updateProfile(true);
        history.push(props.afterSuccessPath);
      })
      .catch((error: Api.Error) => {
        setAlertText(error.message);
        setAlert(true);
      });
  };

  const setVenmoHandleAndId = (venmoHandle: string, venmoId: string) => {
    setVenmoHandle(venmoHandle);
    setVenmoId(venmoId);
    setReadyToSubmit(true);
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
        render={({ handleSubmit, form, submitting, pristine }) => (
          <form onSubmit={handleSubmit} className={classes.root}>
            <div>
              <Field
                name="firstName"
                component={TextFieldAdapter}
                type="text"
                label="First Name"
                required={true}
                placeholder="First Name"
                initialValue={props.model?.firstName}
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
                initialValue={props.model?.lastName}
              />
            </div>
            {showVenmo && (
              <>
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
                    variant="filled"
                    placeholder="Venmo Handle"
                    initialValue={props.model?.venmoHandle}
                  />
                  <VenmoSearch setVenmoHandle={setVenmoHandleAndId} />
                </div>
                <Field
                  className={classes.hidden}
                  name="venmoId"
                  component={TextFieldAdapter}
                  type="text"
                  label="Venmo Id"
                  defaultValue={venmoId}
                  required={true}
                  InputProps={{
                    readOnly: true,
                  }}
                  initialValue={props.model?.venmoId}
                />
              </>
            )}
            <div className={classes.buttons}>
              <Button variant="contained" disabled={submitting || !readyToSubmit} type="submit" color="primary">
                {props.model ? "Update" : "Create"}
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

export default observer(ProfileForm);
