import { Role } from "models/Zoom";
import React from "react";
import ParticipantsStore from "../../VideoConference/store/ParticipantsStore";
import { useEventContext } from "../context";
import Boo from "./Boo";

interface IProps {
  role: Role;
  eventId: string;
  user: any;
  participationsStore: ParticipantsStore;
}
export default function BooWrapper(props: IProps) {
  const { eventSettingsStore } = useEventContext();

  return (
    <Boo
      eventSettingsStore={eventSettingsStore}
      role={props.role}
      eventId={props.eventId}
      user={props.user}
      participationsStore={props.participationsStore}
    />
  );
}
