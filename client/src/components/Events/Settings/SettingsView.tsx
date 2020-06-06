import React from "react";
import EventStore from "../storage/EventStore";
import { observer } from "mobx-react";

interface IProps {
  eventStore: EventStore;
}

function Settings(props: IProps) {
  switch (props.eventStore.state.kind) {
    case "not_ready":
      return <div>Not ready</div>;
    case "ready":
      const event = props.eventStore.state.model;
      return (
        <>
          <div>{event.title}</div>
        </>
      );
  }
}

export default observer(Settings);
