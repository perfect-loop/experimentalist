import React from "react";
import { observer } from "mobx-react";
import { useHistory } from "react-router-dom";
import { useFeature } from "flagged";
import { makeStyles, Theme, createStyles, Button, Paper, Typography, Tooltip } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import HelpIcon from "@material-ui/icons/Help";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import { Form, Field } from "react-final-form";
import { IEventSettings } from "models/EventSettings";
import { EventSettingsStore } from "../store/EventSettingsStore";
import TextFieldAdapter from "../../Forms/TextFieldAdapter";
import CheckBoxAdapter from "../../Forms/CheckBoxAdapter";
import RadioButtonAdapter from "../../Forms/RadioButtonAdapter";
import { INTELLIGENT_READMIT_DESCRIPTION } from "../Show/SettingsView";
import DateTimePickerAdaptor from "../../Forms/DateTimePickerAdaptor";
import { MuiPickersUtilsProvider, KeyboardDateTimePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

interface Props {
  eventId: string;
  eventSettings: IEventSettings;
  store: EventSettingsStore;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& .MuiTextField-root": {
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
    datePicker: {
      "& .MuiTextField-root": {
        width: "35%",
        marginRight: theme.spacing(1),
      },
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
        <Typography variant="h6">Edit Event Settings</Typography>
        <br />
        <Form
          onSubmit={onSubmit}
          initialValues={{ paymentMethod: eventSettings.paymentMethod }}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit} className={classes.root}>
              <div>
                <Typography>
                  Intro video
                  <Tooltip title="Introductory video that will be shown to participants while they are in the waiting room">
                    <HelpIcon fontSize="small" color="disabled" />
                  </Tooltip>
                </Typography>
                <Field
                  name="introVideo"
                  component={TextFieldAdapter}
                  type="title"
                  label="URL to Introduction Video"
                  placeholder="https://player.vimeo.com/video/347119375"
                  initialValue={eventSettings.introVideo}
                />
                {eventSettings.introVideo && eventSettings.introVideo !== "" && (
                  <iframe
                    src={eventSettings.introVideo}
                    width="320"
                    height="180"
                    allow="autoplay; fullscreen"
                    title="Introductory Video"
                  />
                )}
              </div>
              <br />
              <br />
              <div className={classes.datePicker}>
                <Typography>
                  Video session
                  <Tooltip title="The start and end time for the video session. Editing time is not currently allowed">
                    <HelpIcon fontSize="small" color="disabled" />
                  </Tooltip>
                </Typography>
                <Field
                  name="videoStartTime"
                  component={DateTimePickerAdaptor}
                  label="Start time"
                  allowNull
                  defaultValue={eventSettings.videoStartTime}
                  clearable={true}
                  disabled
                />
                <Field
                  name="videoEndTime"
                  component={DateTimePickerAdaptor}
                  label="End time"
                  allowNull
                  disabled
                  defaultValue={eventSettings.videoEndTime}
                />
              </div>
              <br />
              <br />
              <div>
                <Typography>
                  Payment Method
                  <Tooltip title="Method of payment for participants">
                    <HelpIcon fontSize="small" color="disabled" />
                  </Tooltip>
                </Typography>
                <RadioGroup row>
                  <FormControlLabel
                    label="Venmo"
                    control={<Field name="paymentMethod" component={RadioButtonAdapter} type="radio" value="venmo" />}
                  />
                  {selectPaymentMethod && (
                    <FormControlLabel
                      label="PayPal"
                      control={
                        <Field name="paymentMethod" component={RadioButtonAdapter} type="radio" value="paypal" />
                      }
                    />
                  )}
                  <FormControlLabel
                    label="None"
                    control={<Field name="paymentMethod" component={RadioButtonAdapter} type="radio" value="none" />}
                  />
                </RadioGroup>
              </div>
              <br />
              <div>
                <Typography>
                  Identification Required?
                  <Tooltip title="Participants would be required to take a photo before joining the meeting">
                    <HelpIcon fontSize="small" color="disabled" />
                  </Tooltip>
                </Typography>
                <Field
                  name="requireId"
                  component={CheckBoxAdapter}
                  label="Require ID Verification"
                  initialValue={eventSettings.requireId}
                />
              </div>
              <br />
              <div>
                <Field
                  name="intelligentReadmit"
                  component={CheckBoxAdapter}
                  label="Intelligent Re-Admit"
                  initialValue={eventSettings.intelligentReadmit}
                />
                <Tooltip title={INTELLIGENT_READMIT_DESCRIPTION}>
                  <HelpIcon fontSize="small" color="disabled" />
                </Tooltip>
              </div>
              <br />
              <div>
                <Field
                  name="showInstructions"
                  component={CheckBoxAdapter}
                  label="Show Instructions Button"
                  initialValue={eventSettings.showInstructions}
                />
                <Tooltip title="If this option is selected, participants would see the instructions button in the meeting">
                  <HelpIcon fontSize="small" color="disabled" />
                </Tooltip>
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
