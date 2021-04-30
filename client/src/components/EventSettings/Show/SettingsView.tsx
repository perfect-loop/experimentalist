import React from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import { EventSettingsStore } from "../store/EventSettingsStore";
import { IEventSettings } from "models/EventSettings";
import { useHistory } from "react-router-dom";
import { Typography, Tooltip, makeStyles, Theme, createStyles } from "@material-ui/core";
import HelpIcon from "@material-ui/icons/Help";
import { paymentMethod } from "../store/helpers";

interface IProps {
  eventSettingsStore: EventSettingsStore;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    label: {
      marginRight: theme.spacing(1),
    },
  }),
);

export const INTELLIGENT_READMIT_DESCRIPTION =
  "If this option is selected, participants will be automatically added to the conference room every time they reload the conference once the host admits them. Auto-admit will only happen after hosts activates the event with the Start button";

function SettingsView(props: IProps) {
  const history = useHistory();

  const classes = useStyles();
  const formatDate = (date: Date) => {
    const option: any = { timeZoneName: "short" };
    const localeDate = new Date(date);
    return localeDate.toLocaleString("en-US", option);
  };

  switch (props.eventSettingsStore.state.kind) {
    case "empty":
    case "not_ready":
      return <div>Not ready</div>;
    case "ready":
      const eventSettings = props.eventSettingsStore.state.data[0] as IEventSettings;
      if (!eventSettings) {
        history.push(`/events/${props.eventSettingsStore.eventId}/host/settings/new`);
        return <></>;
      }
      return (
        <>
          <div>
            <h3>{eventSettings.event.title}</h3>
          </div>
          <br />
          <Typography>
            Intro video
            <Tooltip title="Introductory video that will be shown to participants while they are in the waiting room">
              <HelpIcon fontSize="small" color="disabled" />
            </Tooltip>
          </Typography>
          {eventSettings.introVideo && eventSettings.introVideo !== "" && (
            <iframe
              src={eventSettings.introVideo}
              width="320"
              height="180"
              allow="autoplay; fullscreen"
              title="Introductory Video"
            />
          )}
          <br />
          <br />
          <div>
            <Typography>
              Video Session
              <Tooltip title="Start and end time of the video session">
                <HelpIcon fontSize="small" color="disabled" />
              </Tooltip>
            </Typography>
            <label className={classes.label}>
              Start Time
              <div>{eventSettings.videoStartTime ? formatDate(eventSettings.videoStartTime) : ""}</div>
            </label>
            <label className={classes.label}>
              End Time
              <div>{eventSettings.videoEndTime ? formatDate(eventSettings.videoEndTime) : ""}</div>
            </label>
          </div>
          <br />
          <br />
          <div>
            <Typography>
              Identification Required?
              <Tooltip title="Participants would be required to take a photo before joining the meeting">
                <HelpIcon fontSize="small" color="disabled" />
              </Tooltip>
            </Typography>
            <div>{eventSettings.requireId ? "Yes" : "No"}</div>
          </div>
          <br />
          <div>
            <Typography>
              Payment Method
              <Tooltip title="Method of payment for participants">
                <HelpIcon fontSize="small" color="disabled" />
              </Tooltip>
            </Typography>
            <div>{paymentMethod(eventSettings.paymentMethod)}</div>
          </div>
          <br />
          <div>
            <Typography>
              Intelligent Re-Admit
              <Tooltip title={INTELLIGENT_READMIT_DESCRIPTION}>
                <HelpIcon fontSize="small" color="disabled" />
              </Tooltip>
            </Typography>
            <div>{eventSettings.intelligentReadmit ? "Yes" : "No"}</div>
          </div>
          <br />
          <div>
            <Typography>
              Show Instructions
              <Tooltip title="If this option is selected, participants would see the instructions button in the meeting">
                <HelpIcon fontSize="small" color="disabled" />
              </Tooltip>
            </Typography>
            <div>{eventSettings.showInstructions ? "Yes" : "No"}</div>
          </div>
          <br />
          <br />
          <Link to={`/events/${props.eventSettingsStore.eventId}/host/settings/edit`}>Edit</Link>
        </>
      );
  }
}

export default observer(SettingsView);
