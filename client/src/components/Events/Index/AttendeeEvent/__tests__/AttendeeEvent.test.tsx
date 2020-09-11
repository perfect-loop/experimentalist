import React from "react";
import { shallow, mount } from "enzyme";
import { ParticipantFactory } from "../../../../../test/factories/ParticipantFactory";
import { MemoryRouter, Link } from "react-router-dom";
import { EventFactory } from "../../../../../test/factories/EventFactory";
import AttendeeEvent from "../../AttendeeEvent";
import Event from "../Event";
import { EventSettingsStore } from "../../../../EventSettings/store/EventSettingsStore";

describe("Events", () => {
  test("Show events", () => {
    const model = ParticipantFactory({
      _id: "pid",
      event: EventFactory({
        _id: "someid",
      }),
    });

    const wrapper = mount(
      <MemoryRouter>
        <AttendeeEvent participation={model} />
      </MemoryRouter>,
    );

    expect(wrapper.find(Event)).toHaveLength(1);
  });
});
