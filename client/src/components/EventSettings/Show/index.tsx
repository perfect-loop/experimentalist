import { Component } from "react";
import React from "react";
import { observer } from "mobx-react";
import SettingsView from "./SettingsView";
import { EventSettingsStore } from "../store/EventSettingsStore";

interface IState {
  eventSettingsStore: EventSettingsStore;
}

interface IProps {
  eventId: string;
}

@observer
export default class Settings extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    const eventStore = new EventSettingsStore(props.eventId);
    this.state = {
      eventSettingsStore: eventStore,
    };
    eventStore.index();
  }

  public render() {
    return <SettingsView eventSettingsStore={this.state.eventSettingsStore} />;
  }
}
