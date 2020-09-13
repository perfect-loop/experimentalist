import React from "react";
import { observer } from "mobx-react";
import { useHistory } from "react-router-dom";
import { useFeature } from "flagged";
import { Paper } from "@material-ui/core";
import { makeStyles, Theme, createStyles, Button } from "@material-ui/core";
import { Form, Field } from "react-final-form";
import { IEventSettings } from "models/EventSettings";
import { Alert, AlertTitle } from "@material-ui/lab";
import { EventSettingsStore } from "../store/EventSettingsStore";
import TextFieldAdapter from "../../Forms/TextFieldAdapter";
import CheckBoxAdapter from "../../Forms/CheckBoxAdapter";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import { Radio } from "final-form-material-ui";

interface Props {
  eventId: string;
  eventSettings: IEventSettings;
  store: EventSettingsStore;
}

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

const EditForm: React.SFC<Props> = ({ store, eventId, eventSettings }) => {
  const selectPaymentMethod = useFeature("selectPaymentMethod");
  const classes = useStyles();
  const history = useHistory();
  const [alert, setAlert] = React.useState(false);

  const onSubmit = (values: any) => {
    const updatedEvent = values as IEventSettings;
    const url = `/api/events/${eventId}/eventSettings/${eventSettings._id}.json`;
    store
      .put(url, updatedEvent)
      .then((eventSettings: IEventSettings) => {
        history.push(`/events/${eventId}/host/settings`);
      })
      .catch(error => {
        setAlert(true);
      });
  };

  return (
    <div className="eventSettings">
      <Paper elevation={4} className={classes.paper}>
        {alert && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            Unable to update event settings. Please try again.
          </Alert>
        )}
        <Form
          onSubmit={onSubmit}
          initialValues={{ paymentMethod: eventSettings.paymentMethod }}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit} className={classes.root}>
              <div>
                <Field
                  name="introVideo"
                  component={TextFieldAdapter}
                  type="title"
                  label="URL to Introduction Video"
                  placeholder="https://player.vimeo.com/video/347119375"
                  initialValue={eventSettings.introVideo}
                />
              </div>
              <br />
              <div>
                <h4>Payment Method </h4>
                <RadioGroup row>
                  <FormControlLabel
                    label="Venmo"
                    control={<Field name="paymentMethod" component={Radio} type="radio" value="venmo" />}
                  />
                  {selectPaymentMethod && (
                    <FormControlLabel
                      label="PayPal"
                      control={<Field name="paymentMethod" component={Radio} type="radio" value="paypal" />}
                    />
                  )}
                </RadioGroup>
              </div>
              <br />
              <div>
                <Field
                  name="requireId"
                  component={CheckBoxAdapter}
                  label="Require ID Verification"
                  initialValue={eventSettings.requireId}
                />
              </div>
              <br />
              <div className="buttons">
                <Button variant="contained" disabled={submitting} type="submit" color="primary">
                  Update
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
    </div>
  );
};

export default observer(EditForm);
