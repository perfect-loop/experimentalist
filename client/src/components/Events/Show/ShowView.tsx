import React from "react";
import EventStore from "../storage/EventStore";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import { ZOOM_MEETING_ID, ZOOM_PERSINAL_MEETING_PASSWORD, ZOOM_SUBDOMAIN } from "../../VideoConference/ConferenceView";
import Button from "@material-ui/core/Button";

interface IProps {
  eventStore: EventStore;
}

function ShowEvent(props: IProps) {
  switch (props.eventStore.state.kind) {
    case "not_ready":
      return <div>Not ready</div>;
    case "ready":
      const event = props.eventStore.state.model;
      return (
        <>
          <div>{event.title}</div>
          <Link to={`/events/${props.eventStore.state.model._id}/conference`}>
            <Button color="primary" variant="contained">
              Start conference as Attendee
            </Button>
          </Link>
          <Link to={`/events/${props.eventStore.state.model._id}/conference?role=host`}>
            <Button color="primary" variant="contained">
              Start conference as Host
            </Button>
          </Link>
          <a
            href={`https://${ZOOM_SUBDOMAIN}.zoom.us/j/${ZOOM_MEETING_ID}?pwd=${ZOOM_PERSINAL_MEETING_PASSWORD}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button color="primary" variant="contained">
              Open Zoom App
            </Button>
          </a>
        </>
      );
  }
}

export default observer(ShowEvent);
