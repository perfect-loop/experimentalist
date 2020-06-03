import React from "react";
import EventsStore from "../storage/EventsStore";
import EventsTable from "./EventsTable";
import { observer } from "mobx-react";

interface IProps {
  eventsStore: EventsStore;
}

function AllEvents(props: IProps) {
  switch (props.eventsStore.state) {
    case "not_ready":
      return <div>Not ready</div>;
    case "ready":
      const events = props.eventsStore.events;
      return <EventsTable events={events} />;
  }
}

export default observer(AllEvents);
