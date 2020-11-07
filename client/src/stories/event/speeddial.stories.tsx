import React from "react";
import { EventSettingsStore } from "../../components/EventSettings/store/EventSettingsStore";
import { ParticipantFactory } from "../../test/factories/ParticipantFactory";
import { EventSettingsFactory } from "../../test/factories/EventSettingsFactory";
import InstructionsAction from "../../components/VideoConference/speeddial/InstructionsAction";

export default {
  title: "Events/Speeddial",
};

const eventId = "skdfsdklf89";
const eventSettingsStore = new EventSettingsStore(eventId);
const p = ParticipantFactory({
  role: "attendee",
  instructions: "http://google.com/",
});

export const Instructions = () => {
  eventSettingsStore.state = {
    kind: "ready",
    data: EventSettingsFactory(),
  };

  return <InstructionsAction participant={p} />;
};

export const InstructionsNotReady = () => {
  eventSettingsStore.state = {
    kind: "ready",
    data: EventSettingsFactory(),
  };

  p.event.state = "not_started";

  return <InstructionsAction participant={p} />;
};

