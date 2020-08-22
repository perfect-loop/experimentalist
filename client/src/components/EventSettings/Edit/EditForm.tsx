import React from "react";
import { observer } from "mobx-react";
import { useHistory } from "react-router-dom";
import { Paper } from "@material-ui/core";
import { makeStyles, Theme, createStyles, Button } from "@material-ui/core";
import { Form, Field } from "react-final-form";
import { IEventSettings } from "models/EventSettings";
import { Alert, AlertTitle } from "@material-ui/lab";
import { EventSettingsStore } from "../store/EventSettingsStore";
import TextFieldAdapter from "../../Forms/TextFieldAdapter";
import CheckBoxAdapter from "../../Forms/CheckBoxAdapter";

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
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit} className={classes.root}>
              <div>
                <Field
                  name="introVideo"
                  component={TextFieldAdapter}
                  type="title"
                  label="URL to Introduction Video"
                  required={true}
                  placeholder="https://player.vimeo.com/video/347119375"
                  initialValue={eventSettings.introVideo}
                />
              </div>
              <div>
                <Field
                  name="requireId"
                  component={CheckBoxAdapter}
                  label="Require ID Verification"
                  initialValue={eventSettings.requireId}
                />
              </div>
              <div className="buttons">
                <Button variant="contained" disabled={submitting} type="submit" color="primary">
                  Update
                </Button>
                <Button variant="contained" onClick={form.reset} disabled={submitting || pristine} color="secondary">
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
