import React from "react";
import EventStore from "../storage/EventStore";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import { ZOOM_MEETING_ID, ZOOM_PERSINAL_MEETING_PASSWORD, ZOOM_SUBDOMAIN } from "../../VideoConference/ConferenceView";
import Button from "@material-ui/core/Button";
import { IEvent } from "api/Events";
import { HostOptions } from "./AdminOptions";

interface IProps {
  eventStore: EventStore;
}

function ShowEvent(props: IProps) {
  switch (props.eventStore.state.kind) {
    case "not_ready":
      return <div>Not ready</div>;
    case "ready":
      const event = props.eventStore.state.model;
      return <HostOptions event={event} />;
  }
}

export default observer(ShowEvent);
