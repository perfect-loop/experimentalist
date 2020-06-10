import React from "react";
import EventsTable from "./EventsTable";
import { observer } from "mobx-react";
import ParticipantsStore from "../../VideoConference/store/ParticipantsStore";

interface IProps {
  participationsStore: ParticipantsStore;
}

function AllEvents(props: IProps) {
  switch (props.participationsStore.state.kind) {
    case "not_ready":
      return <div>Not ready</div>;
    case "ready":
      const participations = props.participationsStore.state.models;
      return <EventsTable participations={participations} />;
  }
}

export default observer(AllEvents);
