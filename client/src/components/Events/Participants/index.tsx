import EventsStore from "../storage/EventsStore";
import { Component } from "react";
import React from "react";
import { observer } from "mobx-react";
import EventStore from "../storage/EventStore";
import AllParticipants from "./AllParticipants";
import ParticipantsStore from "../storage/ParticipantsStore";

interface IState {
  participantsStore: ParticipantsStore;
  eventStore: EventStore;
}

interface IProps {
  eventId: string;
}


@observer
export default class Index extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    const store = new ParticipantsStore(props.eventId);
    const e = new EventStore();
    this.state = {
      participantsStore: store,
      eventStore: e
    };
    store.get();
    e.get(props.eventId);
  }

  public render() {
    return <AllParticipants
      participantsStore={this.state.participantsStore}
      eventStore={this.state.eventStore}
    />;
  }
}
