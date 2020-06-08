import React from "react";
import { Role } from "./ConferenceView";
import { useAuth0 } from "../../util/react-auth0-spa";
import IndeObserverVideoConferencex from "./ObserverVideoConference";

interface IProps {
  role: Role;
  eventId: string;
}

const VideoConference = (props: IProps) => {
  const auth0 = useAuth0();

  const isAuthenticated = auth0.isAuthenticated;
  const user = auth0.user;
  if (!isAuthenticated || !user) {
    return <>Not allowed</>;
  } else {
    return <IndeObserverVideoConferencex user={user} role={props.role} eventId={props.eventId} />;
  }
};

export default VideoConference;
