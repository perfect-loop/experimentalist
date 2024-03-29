import { observer } from "mobx-react";
import { Component } from "react";
import ParticipantsStore from "../../VideoConference/store/ParticipantsStore";
import React from "react";
import VideoConference from "../../VideoConference";
import { Redirect } from "react-router-dom";
import { Role } from "models/Zoom";
import { Auth0User } from "../../../util/react-auth0-spa";
import { isLateToMeeting } from "../../../util/attendance";
import { EventSettingsStore } from "../../EventSettings/store/EventSettingsStore";

interface IProps {
  participationsStore: ParticipantsStore;
  eventSettingsStore: EventSettingsStore;
  role: Role;
  user: Auth0User;
  eventId: string;
}

@observer
export default class Boo extends Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
    this.props.participationsStore.get();
    this.props.eventSettingsStore.index();
  }

  public render(): JSX.Element {
    if (
      this.props.participationsStore.state.kind === "not_ready" ||
      this.props.eventSettingsStore.state.kind === "not_ready" ||
      this.props.eventSettingsStore.state.kind === "empty"
    ) {
      return <div>Loading the conference</div>;
    }
    switch (this.props.participationsStore.state.kind) {
      case "ready": {
        const participant = this.props.participationsStore.state.models.find(a => a.role === "attendee");
        const host = this.props.participationsStore.state.models.find(a => a.role === "host" || a.role === "assistant");
        if (participant || host) {
          if (host) {
            return (
              <VideoConference
                hostParticition={host}
                attendeeParticipation={participant}
                user={this.props.user}
                role={this.props.role}
                eventId={this.props.eventId}
                eventSettings={this.props.eventSettingsStore.state.data[0]}
              />
            );
          }
          if (participant && isLateToMeeting(participant, this.props.eventSettingsStore.state.data[0])) {
            return <Redirect to={`/events/${this.props.eventId}/unavailable`} />;
          } else {
            return (
              <VideoConference
                hostParticition={host}
                attendeeParticipation={participant}
                user={this.props.user}
                role={this.props.role}
                eventId={this.props.eventId}
                eventSettings={this.props.eventSettingsStore.state.data[0]}
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
