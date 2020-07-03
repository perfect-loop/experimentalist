import { IEvent } from "api/Events";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { ZOOM_SUBDOMAIN, ZOOM_MEETING_ID, ZOOM_PERSINAL_MEETING_PASSWORD } from "../../VideoConference/ConferenceView";

export function HostOptions(props: { event: IEvent }) {
  return (
    <>
      <div>{props.event.title}</div>
      <Link to={`/events/${props.event._id}/conference`}>
        <Button color="primary" variant="contained">
          Start conference as Attendee
        </Button>
      </Link>
      <Link to={`/events/${props.event._id}/conference?role=host`}>
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
