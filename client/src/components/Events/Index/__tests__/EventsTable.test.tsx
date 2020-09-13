import React from "react";
import { mount } from "enzyme";
import ParticipantsStore from "../../../VideoConference/store/ParticipantsStore";
import { PartcipantFactory } from "../../../../test/factories/ParticipantFactory";
import { MemoryRouter, Link } from "react-router-dom";
import { EventFactory } from "../../../../test/factories/EventFactory";
import EventsTable from "../EventsTable";
import AttendeeEvent from "../AttendeeEvent";
import HostEvent from "../HostEvent";
import HostHeader from "../HostHeader";
import AttendeeHeader from "../AttendeeHeader";

describe("EventsTable", () => {
  describe("Attendee", () => {
    test("Show event as attendee", () => {
      const ps = [PartcipantFactory()];
      const wrapper = mount(
        <MemoryRouter>
          <EventsTable participations={ps} />
        </MemoryRouter>,
      );
      expect(wrapper.find(AttendeeHeader)).toHaveLength(1);
      expect(wrapper.find(AttendeeEvent)).toHaveLength(1);
      expect(wrapper.find(HostEvent)).toHaveLength(0);
    });
  });
  describe("Host", () => {
    test("Show event as host", () => {
      const ps = [
        PartcipantFactory({
          role: "host",
        }),
      ];
      const wrapper = mount(
        <MemoryRouter>
          <EventsTable participations={ps} />
        </MemoryRouter>,
      );
      expect(wrapper.find(HostHeader)).toHaveLength(1);
      expect(wrapper.find(AttendeeHeader)).toHaveLength(0);
      expect(wrapper.find(AttendeeEvent)).toHaveLength(0);
      expect(wrapper.find(HostEvent)).toHaveLength(1);
    });
  });
  describe("Assistant", () => {
    test("Show event as host", () => {
      const ps = [
        PartcipantFactory({
          role: "assistant",
        }),
      ];
      const wrapper = mount(
        <MemoryRouter>
          <EventsTable participations={ps} />
        </MemoryRouter>,
      );
      expect(wrapper.find(HostHeader)).toHaveLength(1);
      expect(wrapper.find(AttendeeEvent)).toHaveLength(0);
      expect(wrapper.find(HostEvent)).toHaveLength(1);
    });
  });
});
