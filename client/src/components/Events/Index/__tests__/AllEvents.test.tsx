import React from "react";
import { shallow, mount } from "enzyme";
import ParticipantsStore from "../../../VideoConference/store/ParticipantsStore";
import AllEvents from "../AllEvents";
import { PartcipantFactory } from "../../../../test/factories/ParticipantFactory";
import { MemoryRouter, Link } from "react-router-dom";
import { EventFactory } from "../../../../test/factories/EventFactory";
import EventsTable from "../EventsTable";
import AttendeeEvent from "../AttendeeEvent";
import { makeStyles } from "@material-ui/core/styles";
import { EventSettingsStore } from "../../../EventSettings/store/EventSettingsStore";

describe("Events", () => {
  test("Show events", () => {
    const store = new ParticipantsStore();
    store.state = {
      kind: "ready",
      models: [
        PartcipantFactory({
          event: EventFactory({
            state: "not_started",
          }),
        }),
        PartcipantFactory({
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
