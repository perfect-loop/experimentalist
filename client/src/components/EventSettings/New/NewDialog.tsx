import React from "react";
import { useHistory } from "react-router-dom";
import { useFeature } from "flagged";
import { makeStyles, Theme, createStyles, Button } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import { Form, Field } from "react-final-form";
import { IEventSettings } from "models/EventSettings";
import { Alert, AlertTitle } from "@material-ui/lab";
import TextFieldAdapter from "../../Forms/TextFieldAdapter";
import CheckBoxAdapter from "../../Forms/CheckBoxAdapter";
import RadioButtonAdapter from "../../Forms/RadioButtonAdapter";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import { EventSettingsStore } from "../store/EventSettingsStore";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "80%",
      },
    },
    paper: {
      width: "700px",
      height: "100%",
      padding: "20px",
    },
    input: {
      width: "200",
    },
    wysiwyg: {
      height: "100px",
    },
  }),
);

function NewDialog(props: { eventId: string }) {
  const selectPaymentMethod = useFeature("selectPaymentMethod");
  const classes = useStyles();
  const history = useHistory();
  const [alert, setAlert] = React.useState(false);

  const onSubmit = (values: any) => {
    const newEvent = values as IEventSettings;
    const store = new EventSettingsStore(props.eventId);

    store
      .post(newEvent)
      .then((eventSettings: IEventSettings) => {
        history.push(`/events/${props.eventId}/host/settings`);
      })
      .catch(error => {
        setAlert(true);
      });
  };

  return (
    <Paper elevation={4} className={classes.paper}>
      {alert && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Unable to create event settings. Please try again.
        </Alert>
      )}
      <Form
        onSubmit={onSubmit}
        initialValues={{ paymentMethod: "venmo" }}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit} className={classes.root}>
            <div>
              <Field
                name="introVideo"
                component={TextFieldAdapter}
                type="title"
                label="URL to Introduction Video"
                placeholder="https://player.vimeo.com/video/347119375"
              />
            </div>
            <br />
            <div>
              <h4>Payment Method </h4>
              <RadioGroup row>
                <FormControlLabel
                  label="Venmo"
                  control={<Field name="paymentMethod" component={RadioButtonAdapter} type="radio" value="venmo" />}
                />
                {selectPaymentMethod && (
                  <FormControlLabel
                    label="PayPal"
                    control={<Field name="paymentMethod" component={RadioButtonAdapter} type="radio" value="paypal" />}
                  />
                )}
              </RadioGroup>
            </div>
            <br />
            <div>
              <Field name="requireId" component={CheckBoxAdapter} label="Require ID Verification" initialValue={true} />
            </div>
            <br />
            <div className="buttons">
              <Button variant="contained" disabled={submitting} type="submit" color="primary">
                Create
              </Button>
              <Button
                variant="contained"
                onClick={form.reset}
                disabled={submitting || pristine}
                color="secondary"
                style={{ marginLeft: "20px" }}
              >
                Reset
              </Button>
            </div>
          </form>
        )}
      />
    </Paper>
  );
}

export default NewDialog;
