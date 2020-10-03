import React from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react";
import { EventSettingsStore } from "../store/EventSettingsStore";
import { IEventSettings } from "models/EventSettings";
import { useHistory } from "react-router-dom";
import { Typography, Tooltip } from "@material-ui/core";
import HelpIcon from "@material-ui/icons/Help";
import { paymentMethod } from "../store/helpers";

interface IProps {
  eventSettingsStore: EventSettingsStore;
}

function SettingsView(props: IProps) {
  const history = useHistory();
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
          <br />
          <Link to={`/events/${props.eventSettingsStore.eventId}/host/settings/edit`}>Edit</Link>
        </>
      );
  }
}

export default observer(SettingsView);
