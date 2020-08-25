import React, { Component } from "react";
import { observer } from "mobx-react";
import Event from "./Event";
import { IParticipation } from "models/Participations";
import { EventSettingsStore } from "../../../EventSettings/store/EventSettingsStore";

interface IProps {
  participation: IParticipation;
}

interface IState {
  eventSettingsStore: EventSettingsStore;
}

@observer
class AttendeeEvent extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    const eventSettingsStore = new EventSettingsStore(props.participation.event._id);
    this.state = {
      eventSettingsStore,
    };

    eventSettingsStore.index();
  }

  render() {
    return <Event eventSettingsStore={this.state.eventSettingsStore} participation={this.props.participation} />;
  }
}

export default AttendeeEvent;
