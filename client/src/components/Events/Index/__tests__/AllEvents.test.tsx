import React from "react";
import { shallow } from "enzyme";
import ParticipantsStore from "../../../VideoConference/store/ParticipantsStore";
import { ParticipantFactory } from "../../../../test/factories/ParticipantFactory";
import { EventFactory } from "../../../../test/factories/EventFactory";
import AllEvents from "../AllEvents";
import EventsTable from "../EventsTable";
import AttendeeEvent from "../AttendeeEvent";
import { EventSettingsStore } from "../../../EventSettings/store/EventSettingsStore";

describe("Events", () => {
  test("Show events", () => {
    const store = new ParticipantsStore();
    store.state = {
      kind: "ready",
      models: [
        ParticipantFactory({
          event: EventFactory({
            state: "not_started",
          }),
        }),
        ParticipantFactory({
          event: EventFactory({
            state: "ended",
          }),
        }),
      ],
    };

    const wrapper = shallow(<AllEvents participationsStore={store} />);

    expect(wrapper.find(EventsTable)).toHaveLength(1);
  });
});
