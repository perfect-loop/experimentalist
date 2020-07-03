import React from "react";
import { Role } from "api/Zoom";
import VideoConference from "../../VideoConference";
import { Redirect } from "react-router-dom";
import { useAuth0 } from "../../../util/react-auth0-spa";
import ParticipantsStore from "../../VideoConference/store/ParticipantsStore";
import { observer } from "mobx-react";
import Boo from "./Boo";

function Conference(props: { role: Role; eventId: string }) {
  const auth0 = useAuth0();
  const isAuthenticated = auth0.isAuthenticated;
  const user = auth0.user;
  const participationsStore = new ParticipantsStore(props.eventId);

  if (!isAuthenticated || !user) {
    return <>Not allowed</>;
  }

  return <Boo role={props.role} eventId={props.eventId} user={user} participationsStore={participationsStore} />;
}

export default Conference;
