import React from "react";
import EventStore from "../storage/EventStore";
import { observer } from "mobx-react";
import ParticipantsStore from "../storage/ParticipantsStore";
import ParticipantsTable from "./ParticipantsTable";
import UploadErrors from "./UploadErrors";

interface IProps {
  eventStore: EventStore;
  participantsStore: ParticipantsStore;
}

const AllParticipants: React.SFC<IProps> = ({ eventStore, participantsStore }) => {
  if (eventStore.state.kind === "ready" && participantsStore.state === "ready") {
    return (
      <>
        <ParticipantsTable participants={participantsStore.participations} />
        <br />
        <br />
        <UploadErrors store={participantsStore} errors={participantsStore.uploadErrors} />
      </>
    );
  }
  if (participantsStore.state === "error") {
    return <ParticipantsTable participants={participantsStore.participations} />;
  } else {
    return <>Loading</>;
  }
};

export default observer(AllParticipants);
