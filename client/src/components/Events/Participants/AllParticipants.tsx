import React from "react";
import EventStore from "../storage/EventStore";
import { observer } from "mobx-react";
import ParticipantsStore from "../storage/ParticipantsStore";
import ParticipantsTable from "./ParticipantsTable";

interface IProps {
  eventStore: EventStore;
  participantsStore: ParticipantsStore;
}

function AllParticipants(props: IProps) {
  if(props.eventStore.state.kind === "ready" && props.participantsStore.state === "ready") {
    return <ParticipantsTable participants={props.participantsStore.participations} />;
  } else {
    return <div>Not ready</div>;
  }
}

export default observer(AllParticipants);
