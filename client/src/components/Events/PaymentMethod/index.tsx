import React, { Component } from "react";
import { observer } from "mobx-react";
import ProfileStore from "../../Profile/storage/ProfileStore";
import { EventSettingsStore } from "../../EventSettings/store/EventSettingsStore";
import PaymentMethodRenderer from "./PaymentMethodRenderer";

interface IProps {
  eventId: string;
  profileStore?: ProfileStore;
  participationId?: string;
}

@observer
export default class PaymentMethod extends Component<IProps, {}> {
  private profileStore = this.props.profileStore || new ProfileStore();
  private eventSettingsStore = new EventSettingsStore(this.props.eventId);

  constructor(props: IProps) {
    super(props);
    this.profileStore.index();
    this.eventSettingsStore.index();
  }

  public render(): JSX.Element {
    switch (this.profileStore.state.kind) {
      case "not_ready":
      case "empty":
        return <div>Loading</div>;
      case "ready":
        return (
          <PaymentMethodRenderer
            eventSettingsStore={this.eventSettingsStore}
            profileStore={this.profileStore}
            eventId={this.props.eventId}
            profileData={this.profileStore.state.data[0]}
          />
        );
    }
  }
}
