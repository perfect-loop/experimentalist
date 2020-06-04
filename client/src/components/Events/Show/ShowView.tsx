import React from "react";
import EventStore from "../storage/EventStore";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";

interface IProps {
  eventStore: EventStore;
}

function ShowEvent(props: IProps) {
  switch (props.eventStore.state.kind) {
    case "not_ready":
      return <div>Not ready</div>;
    case "ready":
      const event = props.eventStore.state.model
      return (
        <>
          <div>
            {event.title}
          </div>
          <Link to="event/conference" className="btn btn-primary">
            Start conference as Attendee
        </Link>
          <Link to="admin/event/conference" className="btn btn-primary">
            Start conference as Host
        </Link>
        </>
      );
  }
}

export default observer(ShowEvent);
