import React from "react";
import { useHistory } from "react-router-dom";
import { useFeature } from "flagged";
import { makeStyles, Theme, createStyles, Button, Paper, Typography, Tooltip } from "@material-ui/core";
import { Form, Field } from "react-final-form";
import { IEventSettings } from "models/EventSettings";
import { Alert, AlertTitle } from "@material-ui/lab";
import HelpIcon from "@material-ui/icons/Help";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import TextFieldAdapter from "../../Forms/TextFieldAdapter";
import CheckBoxAdapter from "../../Forms/CheckBoxAdapter";
import RadioButtonAdapter from "../../Forms/RadioButtonAdapter";
import DateTimePickerAdaptor from "../../Forms/DateTimePickerAdaptor";

import { EventSettingsStore } from "../store/EventSettingsStore";
import { INTELLIGENT_READMIT_DESCRIPTION } from "../Show/SettingsView";

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
        history.push(`/events`);
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
      <Typography variant="h6">Event Settings</Typography>
      <br />
      <Form
        onSubmit={onSubmit}
        initialValues={{ paymentMethod: "venmo" }}
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
              />
            </div>
            <br />
            <br />
            <div className={classes.datePicker}>
              <Typography>
                Video session
                <Tooltip title="Select the start and end time for the video session">
                  <HelpIcon fontSize="small" color="disabled" />
                </Tooltip>
              </Typography>
              <Field
                name="videoStartTime"
                component={DateTimePickerAdaptor}
                label="Start time"
                allowNull
                showTodayButton
                defaultValue={null}
              />
              <Field
                name="videoEndTime"
                component={DateTimePickerAdaptor}
                label="End time"
                allowNull
                showTodayButton
                defaultValue={null}
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
                    control={<Field name="paymentMethod" component={RadioButtonAdapter} type="radio" value="paypal" />}
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
              <Field name="requireId" component={CheckBoxAdapter} label="Require ID Verification" initialValue={true} />
            </div>
            <br />
            <div>
              <Field name="intelligentReadmit" component={CheckBoxAdapter} label="Intelligent Re-Admit" value={false} />
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
                initialValue={true}
              />
              <Tooltip title="If this option is selected, participants would see the instructions button in the meeting">
                <HelpIcon fontSize="small" color="disabled" />
              </Tooltip>
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
