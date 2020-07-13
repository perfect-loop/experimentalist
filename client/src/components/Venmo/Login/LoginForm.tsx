import React from "react";
import { Button, makeStyles, Theme, Typography } from "@material-ui/core";
import { Form, Field } from "react-final-form";
import TextFieldAdapter from "../../Forms/TextFieldAdapter";
import VenmoStorage from "./storage/VenmoStorage";
import clsx from "clsx";

const useStyles = makeStyles((theme: Theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  textField: {
    width: "80%",
  },
}));

interface IVenmoCredentials {
  login: string;
  password: string;
}
const LoginForm = (props: { venmoStorage: VenmoStorage }) => {
  const classes = useStyles();
  const onSubmit = (values: IVenmoCredentials) => {
    console.log(values.login);
    props.venmoStorage.login(values.login, values.password);
  };
  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <>
          <form onSubmit={handleSubmit}>
            <div>
              <Field
                name="login"
                component={TextFieldAdapter}
                type="text"
                label="Email, mobile or username"
                required={true}
                className={clsx(classes.margin, classes.textField)}
                placeholder="Email, mobile or username"
              />
            </div>
            <div>
              <Field
                name="password"
                component={TextFieldAdapter}
                type="password"
                label="Password"
                required={true}
                className={clsx(classes.margin, classes.textField)}
                placeholder="password"
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
                Sign In
              </Button>
            </div>
          </form>
          <Typography variant="body1" color="textPrimary" component="p">
            When you click Sign In, you confirm that you are authorized to use the phone number associated with your
            Venmo account and agree to receive SMS texts to verify your identity. Carrier fees may apply.
          </Typography>
        </>
      )}
    />
  );
};

export default LoginForm;
