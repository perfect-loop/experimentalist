import React from "react";
import { Role } from "models/Zoom";
import { useAuth0 } from "../../../util/react-auth0-spa";
import ParticipantsStore from "../../VideoConference/store/ParticipantsStore";
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
