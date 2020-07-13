import React from "react";
import clsx from "clsx";
import { Form, Field } from "react-final-form";
import TextFieldAdapter from "../../Forms/TextFieldAdapter";
import VenmoStorage from "./storage/VenmoStorage";
import { Button, Typography, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  margin: {
    margin: theme.spacing(1),
  },
  textField: {
    width: "80%",
  },
}));

interface IVenmoCode {
  code: number;
}
const MFAForm = (props: { venmoStorage: VenmoStorage }) => {
  const classes = useStyles();
  const onSubmit = (values: IVenmoCode) => {
    console.log(values.code);
    props.venmoStorage.verifyMFA(values.code);
  };
  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <>
          <Typography variant="body1" color="textPrimary" component="p">
            Confirm your identity.
          </Typography>
          <Typography variant="body1" color="textPrimary" component="p">
            Enter the code sent to your phone number
          </Typography>
          <form onSubmit={handleSubmit} autoComplete="off" className={classes.root}>
            <div>
              <Field
                name="code"
                component={TextFieldAdapter}
                type="text"
                label="Code"
                required={true}
                placeholder="Code"
                className={clsx(classes.margin, classes.textField)}
              />
            </div>
            <div className="buttons">
              <Button
                className={clsx(classes.margin)}
                variant="contained"
                disabled={submitting}
                type="submit"
                color="primary"
              >
                Confirm
              </Button>
            </div>
          </form>
        </>
      )}
    />
  );
};

export default MFAForm;
