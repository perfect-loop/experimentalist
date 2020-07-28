import React from "react";
import { shallow, mount } from "enzyme";
import ParticipantsStore from "../../../VideoConference/store/ParticipantsStore";
import { PartcipantFactory } from "../../../../test/factories/ParticipantFactory";
import { MemoryRouter, Link } from "react-router-dom";
import { EventFactory } from "../../../../test/factories/EventFactory";
import AttendeeEvent from "../AttendeeEvent";

describe("AttendeeEvent", () => {
  test("Show link to verify identity", () => {
    const model = PartcipantFactory({
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
    const link = wrapper.find(Link).at(0);
    expect(link.prop("to")).toBe("/events/someid/verify/pid");
  });

  test("Show link to verify conference when identity is verified", () => {
    const model = PartcipantFactory({
      _id: "pid",
      verificationImageUrl: "/some/yrl",
      event: EventFactory({
        _id: "someid",
      }),
    });
    const wrapper = mount(
      <MemoryRouter>
        <AttendeeEvent participation={model} />
      </MemoryRouter>,
    );
    const link = wrapper.find(Link).at(0);
    expect(link.prop("to")).toBe("/events/someid/conference");
  });
});
