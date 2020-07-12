import { IEvent } from "api/Events";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

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
    </>
  );
}
