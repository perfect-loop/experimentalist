import { observer } from "mobx-react";
import React, { Component } from "react";
import ConferenceView from "./ConferenceView";
import { Auth0User } from "../../util/react-auth0-spa";
import ParticipantsStore from "./store/ParticipantsStore";
import { Role } from "api/Zoom";
import { IParticipation } from "api/Participations";

interface IProps {
  user: Auth0User;
  role: Role;
  eventId: string;
  hostParticipation?: IParticipation;
  attendeeParticipation?: IParticipation;
}

@observer
export default class IndeObserverVideoConferencex extends Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  public render() {
    if (this.props.role === Role.Host && this.props.hostParticipation) {
      return <ConferenceView role={Role.Host} user={this.props.user} participant={this.props.hostParticipation} />;
    } else if (this.props.role === Role.Attendee && this.props.hostParticipation) {
      return <ConferenceView role={Role.Attendee} user={this.props.user} participant={this.props.hostParticipation} />;
    } else if (this.props.role === Role.Attendee && this.props.attendeeParticipation) {
      return (
        <ConferenceView role={Role.Attendee} user={this.props.user} participant={this.props.attendeeParticipation} />
      );
    } else {
      return <div>Not allowed</div>;
    }
  }
}
