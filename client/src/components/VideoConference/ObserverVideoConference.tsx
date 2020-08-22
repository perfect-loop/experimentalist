import { observer } from "mobx-react";
import React, { Component } from "react";
import ConferenceView from "./ConferenceView";
import { Auth0User } from "../../util/react-auth0-spa";
import { Role } from "models/Zoom";
import { IParticipation } from "models/Participations";

interface IProps {
  user: Auth0User;
  role: Role;
  eventId: string;
  hostParticipation?: IParticipation;
  attendeeParticipation?: IParticipation;
  showFab: boolean;
}

@observer
export default class IndeObserverVideoConferencex extends Component<IProps, {}> {
  public render() {
    if (this.props.role === Role.Host && this.props.hostParticipation) {
      return (
        <ConferenceView
          role={Role.Host}
          user={this.props.user}
          participant={this.props.hostParticipation}
          showFab={this.props.showFab}
        />
      );
    } else if (this.props.role === Role.Attendee && this.props.hostParticipation) {
      return (
        <ConferenceView
          role={Role.Attendee}
          user={this.props.user}
          participant={this.props.hostParticipation}
          showFab={this.props.showFab}
        />
      );
    } else if (this.props.role === Role.Attendee && this.props.attendeeParticipation) {
      return (
        <ConferenceView
          role={Role.Attendee}
          user={this.props.user}
          participant={this.props.attendeeParticipation}
          showFab={this.props.showFab}
        />
      );
    } else {
      return <div>Not allowed</div>;
    }
  }
}
