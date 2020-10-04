import React from "react";
import { EventSettingsStore } from "../../components/EventSettings/store/EventSettingsStore";
import { ParticipantFactory } from "../../test/factories/ParticipantFactory";
import IntroductionView from "../../components/VideoConference/intro/IntroductionView";
import { EventSettingsFactory } from "../../test/factories/EventSettingsFactory";

export default {
  title: "Events/Introduction",
};

const eventId = "skdfsdklf89";
const eventSettingsStore = new EventSettingsStore(eventId);
const p = ParticipantFactory({
  role: "attendee",
});

export const SettingsReady = () => {
  eventSettingsStore.state = {
    kind: "ready",
    data: EventSettingsFactory(),
  };
  return <IntroductionView participant={p} eventSettings={eventSettingsStore.state.data[0]} />;
};
