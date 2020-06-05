import EventsStore from "../storage/EventsStore";
import { Component } from "react";
import React from "react";
import { observer } from "mobx-react";

interface IState {
  eventsStore: EventsStore;
}

@observer
export default class Index extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    const events = new EventsStore();
    this.state = {
      eventsStore: events,
    };
    events.getEvents();
  }

  public render() {
    return <>All Participants</>;
  }
}
