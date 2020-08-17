import { observer } from "mobx-react";
import { Component } from "react";
import ParticipantsStore from "../../VideoConference/store/ParticipantsStore";
import React from "react";
import VideoConference from "../../VideoConference";
import { Redirect } from "react-router-dom";
import { Role } from "models/Zoom";
import { Auth0User } from "../../../util/react-auth0-spa";
import { isLateToMeeting } from "../../../util/attendance";

interface IProps {
  participationsStore: ParticipantsStore;
  role: Role;
  user: Auth0User;
  eventId: string;
}

@observer
export default class Boo extends Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
    this.props.participationsStore.get();
  }

  public render() {
    switch (this.props.participationsStore.state.kind) {
      case "not_ready": {
        console.log("It is NOT ready");
        return <div>Loading the conference</div>;
      }
      case "ready": {
        const participant = this.props.participationsStore.state.models.find(a => a.role === "attendee");
        const host = this.props.participationsStore.state.models.find(a => a.role === "host");
        if (participant || host) {
          if (host) {
            return (
              <VideoConference
                hostParticition={host}
                attendeeParticipation={participant}
                user={this.props.user}
                role={this.props.role}
                eventId={this.props.eventId}
              />
            );
          }
          if (participant && isLateToMeeting(participant)) {
            return <Redirect to={`/events/${this.props.eventId}/unavailable`} />;
          } else {
            return (
              <VideoConference
                hostParticition={host}
                attendeeParticipation={participant}
                user={this.props.user}
                role={this.props.role}
                eventId={this.props.eventId}
              />
            );
          }
        } else {
          return <>Not Authorized</>;
        }
      }
    }
  }
}
