import React from "react";
import { Button, makeStyles, Theme, Typography } from "@material-ui/core";
import { Form, Field } from "react-final-form";
import TextFieldAdapter from "../../Forms/TextFieldAdapter";
import VenmoSearchStorage from "./storage/VenmoSearchStorage";
import clsx from "clsx";

const useStyles = makeStyles((theme: Theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  textField: {
    width: "80%",
  },
}));

const LoginForm = (props: { venmoStorage: VenmoSearchStorage }) => {
  const classes = useStyles();
  const onSubmit = (values: any) => {
    props.venmoStorage.search(values.venmoHandle);
  };
  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <>
          <form onSubmit={handleSubmit}>
            <div>
              <Field
                name="venmoHandle"
                component={TextFieldAdapter}
                type="text"
                label="Venmo handle"
                required={true}
                className={clsx(classes.margin, classes.textField)}
                placeholder="Venmo Handle"
              />
            </div>
            <div className="buttons">
              <Button
                variant="contained"
                className={clsx(classes.margin)}
                disabled={submitting}
                type="submit"
                color="primary"
              >
                Search
              </Button>
            </div>
            <Typography variant="caption">
              To check your Venmo username, click{" "}
              <a target="_blank" rel="noopener noreferrer" href="https://venmo.com/account/settings/profile">
                here
              </a>
            </Typography>
          </form>
        </>
      )}
    />
  );
};

export default LoginForm;
