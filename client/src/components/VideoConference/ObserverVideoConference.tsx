import { observer } from "mobx-react";
import React, { Component } from "react";
import ConferenceView from "./ConferenceView";
import { Auth0User } from "../../util/react-auth0-spa";
import ParticipantsStore from "./store/ParticipantsStore";
import { Role } from "api/Zoom";

interface IState {
  participationsStore: ParticipantsStore;
}

interface IProps {
  user: Auth0User;
  role: Role;

  eventId: string;
}

@observer
export default class IndeObserverVideoConferencex extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      participationsStore: new ParticipantsStore(this.props.eventId),
    };
    this.state.participationsStore.get();
  }

  public render() {
    switch (this.state.participationsStore.state.kind) {
      case "not_ready": {
        console.log("It is NOT ready");
        return <div>Not ready</div>;
      }
      case "ready": {
        console.log("It is ready");
        const participant = this.state.participationsStore.state.models.find(a => a.role === "attendee");
        const host = this.state.participationsStore.state.models.find(a => a.role === "host");
        if (this.props.role === Role.Host && host) {
          return <ConferenceView role={Role.Host} user={this.props.user} participant={host} />;
        } else if (this.props.role === Role.Attendee && host) {
          return <ConferenceView role={Role.Attendee} user={this.props.user} participant={host} />;
        } else if (this.props.role === Role.Attendee && participant) {
          return <ConferenceView role={Role.Attendee} user={this.props.user} participant={participant} />;
        } else {
          return <div>Not allowed</div>;
        }
      }
    }
  }
}
