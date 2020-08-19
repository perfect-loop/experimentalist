import React from "react";
import { observer } from "mobx-react";
import { EventSettingsStore } from "../store/EventSettingsStore";
import { IEventSettings } from "models/EventSettings";
import { useHistory } from "react-router-dom";
import { Typography, Tooltip } from "@material-ui/core";
import HelpIcon from "@material-ui/icons/Help";

interface IProps {
  eventSettingsStore: EventSettingsStore;
}

function Settings(props: IProps) {
  const history = useHistory();
  switch (props.eventSettingsStore.state.kind) {
    case "not_ready":
      return <div>Not ready</div>;
    case "ready":
      const eventSettings = props.eventSettingsStore.state.data as IEventSettings;
      if (!eventSettings) {
        history.push(`/events/${props.eventSettingsStore.eventId}/host/settings/new`);
        return <></>;
      }
      return (
        <>
          <div>{eventSettings.event.title}</div>
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
        </>
      );
  }
}

export default observer(Settings);
