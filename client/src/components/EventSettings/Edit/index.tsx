import React, { Component } from "react";
import { observer } from "mobx-react";
import { IEventSettings } from "models/EventSettings";
import { EventSettingsStore } from "../store/EventSettingsStore";
import EditForm from "./EditForm";

interface IState {
  eventSettingsStore: EventSettingsStore;
}

interface IProps {
  eventId: string;
}

@observer
class Edit extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    const eventSettingsStore = new EventSettingsStore(props.eventId);
    this.state = {
      eventSettingsStore,
    };
    eventSettingsStore.index();
  }

  render() {
    const { eventSettingsStore } = this.state;

    switch (eventSettingsStore.state.kind) {
      case "not_ready":
        return <div>Not ready</div>;
      case "ready":
        const eventSettings = eventSettingsStore.state.data[0] as IEventSettings;

        return <EditForm store={eventSettingsStore} eventId={this.props.eventId} eventSettings={eventSettings} />;
    }
  }
}

export default Edit;
