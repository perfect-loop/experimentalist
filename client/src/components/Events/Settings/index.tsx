import EventStore from "../storage/EventStore";
import { Component } from "react";
import React from "react";
import { observer } from "mobx-react";
import SettingsView from "./SettingsView";

interface IState {
  eventStore: EventStore;
}

interface IProps {
  id: string;
}

@observer
export default class Settings extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    const eventStore = new EventStore();
    this.state = {
      eventStore,
    };
    eventStore.get(props.id);
  }

  public render() {
    return <SettingsView eventStore={this.state.eventStore} />;
  }
}
