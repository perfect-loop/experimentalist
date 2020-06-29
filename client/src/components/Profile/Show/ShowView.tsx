import React from "react";
import ProfileStore from "../storage/ProfileStore";
import { makeStyles, Theme, createStyles } from "@material-ui/core";
import { Form, Field } from "react-final-form";
import { Paper } from "@material-ui/core";
import { observer } from "mobx-react";
import TextFieldAdapter from "../../Forms/TextFieldAdapter";
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
      const profile = props.profileStore.state.model;
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
                      // required={true}
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
                  <div>
                    <Field
                      name="venmoId"
                      component={TextFieldAdapter}
                      type="text"
                      label="Venmo Id"
                      defaultValue={profile.venmoId}
                      // required={true}
                      InputProps={{
                        readOnly: true,
                      }}
                      placeholder="Venmo Id"
                    />
                  </div>
                  <div>
                    <Field
                      name="studentId"
                      component={TextFieldAdapter}
                      type="text"
                      label="Student Id"
                      defaultValue={profile.studentId}
                      // required={true}
                      InputProps={{
                        readOnly: true,
                      }}
                      placeholder="Student Id"
                    />
                  </div>
                  <div>
                    <Field
                      name="phone"
                      component={TextFieldAdapter}
                      type="text"
                      label="Phone"
                      defaultValue={profile.phone}
                      // required={true}
                      InputProps={{
                        readOnly: true,
                      }}
                      placeholder="Phone"
                    />
                  </div>
                  <div>
                    <Field
                      name="street"
                      component={TextFieldAdapter}
                      type="text"
                      label="Street"
                      defaultValue={profile.street}
                      // required={true}
                      InputProps={{
                        readOnly: true,
                      }}
                      placeholder="Street"
                    />
                  </div>
                  <div>
                    <Field
                      name="state"
                      component={TextFieldAdapter}
                      type="text"
                      label="State"
                      defaultValue={profile.state}
                      // required={true}
                      InputProps={{
                        readOnly: true,
                      }}
                      placeholder="State"
                    />
                  </div>
                  <div>
                    <Field
                      name="zip"
                      component={TextFieldAdapter}
                      type="text"
                      label="Zip"
                      // required={true}
                      InputProps={{
                        readOnly: true,
                      }}
                      defaultValue={profile.zip}
                      // disabled={true}
                      placeholder="Zip"
                    />
                  </div>
                </form>
              )}
            />
          </Paper>
        </>
      );
  }
}

export default observer(ShowProfile);