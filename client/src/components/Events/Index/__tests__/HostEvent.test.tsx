import React from "react";
import { mount } from "enzyme";
import HostEvent from "../HostEvent";
import { ParticipantFactory } from "../../../../test/factories/ParticipantFactory";
import { Link, MemoryRouter } from "react-router-dom";

describe("HostEvent", () => {
  test("Compensation Link", () => {
    const participant = ParticipantFactory();

    const wrapper = mount(
      <MemoryRouter>
        <HostEvent participation={participant} />
      </MemoryRouter>,
    );
    const url = `/events/${participant.event._id}/host/compensations/venmo`;
    const links = wrapper.find(Link).findWhere(link => link.prop("to") === url);
    expect(links).toHaveLength(1);
  });
});
