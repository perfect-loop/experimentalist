import React from "react";
import ProfileStore from "../storage/ProfileStore";
import { makeStyles, Theme, createStyles } from "@material-ui/core";
import { Form, Field } from "react-final-form";
import { Paper } from "@material-ui/core";
import { observer } from "mobx-react";
import TextFieldAdapter from "../../Forms/TextFieldAdapter";
import { FULLSTORY_CODE, SMARTLOOK_API_KEY } from "../../../util/config";
import smartlookClient from "smartlook-client";
import { identify } from "react-fullstory";
import { IProfile } from "models/Profiles";
import { Link } from "react-router-dom";

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

interface IProps {
  profileStore: ProfileStore;
}

function ShowProfile(props: IProps) {
  const classes = useStyles();

  const onSubmit = () => {
    return;
  };
  switch (props.profileStore.state.kind) {
    case "not_ready":
      return <div>Not ready</div>;
    case "empty":
      return <div>Profile not found</div>;
    case "ready":
      const profile: IProfile = props.profileStore.state.data[0];
      if (FULLSTORY_CODE) {
        const params = {
          displayName: `${profile.firstName} ${profile.lastName}`,
        };
        identify(profile.userId, params);
      }

      if (SMARTLOOK_API_KEY && profile && profile.userId) {
        const params = {
          displayName: `${profile.firstName} ${profile.lastName}`,
        };
        console.log(`smartlook idenitify ${profile.userId}`);
        smartlookClient.identify(profile.userId, params);
      }
      return (
        <>
          <Paper elevation={4} className={classes.paper}>
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
                      defaultValue={profile.firstName}
                      InputProps={{
                        readOnly: true,
                      }}
                      placeholder="First Name"
                    />
                  </div>
                  <div>
                    <Field
                      name="lastName"
                      component={TextFieldAdapter}
                      type="text"
                      label="Last Name"
                      // required={true}
                      InputProps={{
                        readOnly: true,
                        style: {
                          cursor: "default",
                        },
                      }}
                      defaultValue={profile.lastName}
                      placeholder="Last Name"
                    />
                  </div>
                  {profile.venmoHandle && (
                    <div>
                      <Field
                        name="venmoHandle"
                        component={TextFieldAdapter}
                        type="text"
                        label="Venmo Handle"
                        defaultValue={profile.venmoHandle}
                        // required={true}
                        InputProps={{
                          readOnly: true,
                        }}
                        placeholder="Venmo Handle"
                      />
                    </div>
                  )}
                </form>
              )}
            />
          </Paper>
          <Link to={`/profile/edit`}>Edit</Link>
        </>
      );
  }
}

export default observer(ShowProfile);
