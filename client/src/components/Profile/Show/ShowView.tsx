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
    div: {
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
    return
  }
  switch (props.profileStore.state.kind) {
    case "not_ready":
      return <div>Not ready</div>;
    case "empty":
      return <div>Profile not found</div>
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
                      label={profile.firstName}
                      // required={true}
                      disabled={true}
                      placeholder={profile.firstName}
                    />
                  </div>
                  <div>
                    <Field
                      name="lastName"
                      component={TextFieldAdapter}
                      type="text"
                      // required={true}
                      disabled={true}
                      label={profile.lastName}
                      placeholder={profile.lastName}
                    />
                  </div>
                  <div>
                    <Field
                      name="venmoId"
                      component={TextFieldAdapter}
                      type="text"
                      label={profile.venmoId}
                      // required={true}
                      disabled={true}
                      placeholder={profile.venmoId}
                    />
                  </div>
                  <div>
                    <Field
                      name="studentId"
                      component={TextFieldAdapter}
                      type="text"
                      label={profile.studentId}
                      // required={true}
                      disabled={true}
                      placeholder={profile.studentId}
                    />
                  </div>
                  <div>
                    <Field
                      name="phone"
                      component={TextFieldAdapter}
                      type="text"
                      label={profile.phone}
                      // required={true}
                      disabled={true}
                      placeholder={profile.phone}
                    />
                  </div>
                  <div>
                    <Field
                      name="street"
                      component={TextFieldAdapter}
                      type="text"
                      label={profile.street}
                      // required={true}
                      disabled={true}
                      placeholder={profile.street}
                    />
                  </div>
                  <div>
                    <Field
                      name="state"
                      component={TextFieldAdapter}
                      type="text"
                      label={profile.state}
                      // required={true}
                      disabled={true}
                      placeholder={profile.state}
                    />
                  </div>
                  <div>
                    <Field
                      name="zip"
                      component={TextFieldAdapter}
                      type="text"
                      label={profile.zip}
                      // required={true}
                      disabled={true}
                      placeholder={profile.zip}
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
