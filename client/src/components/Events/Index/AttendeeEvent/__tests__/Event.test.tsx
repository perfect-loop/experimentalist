import React from "react";
import { MemoryRouter, Link } from "react-router-dom";
import { mount } from "enzyme";
import { ParticipantFactory } from "../../../../../test/factories/ParticipantFactory";
import { EventFactory } from "../../../../../test/factories/EventFactory";
import { EventSettingsFactory } from "../../../../../test/factories/EventSettingsFactory";
import Event from "../Event";
import { EventSettingsStore } from "../../../../EventSettings/store/EventSettingsStore";

describe("Event", () => {
  describe("Event has no settings", () => {
    test("Show link to verify identity if user has not been verified", () => {
      const model = ParticipantFactory({
        _id: "pid",
        event: EventFactory({
          _id: "someid",
        }),
      });

      const store = new EventSettingsStore("someid");
      store.state = {
        kind: "ready",
        data: [EventSettingsFactory()],
      };

      const wrapper = mount(
        <MemoryRouter>
          <Event participation={model} eventSettingsStore={store} />
        </MemoryRouter>,
      );

      const link = wrapper.find(Link).at(0);
      expect(link.prop("to")).toBe("/events/someid/verify/pid");
    });

    test("Show link to verify conference when identity is verified", () => {
      const model = ParticipantFactory({
        _id: "pid",
        verificationImageUrl: "/some/yrl",
        event: EventFactory({
          _id: "someid",
        }),
      });

      const store = new EventSettingsStore("someid");
      store.state = {
        kind: "ready",
        data: [EventSettingsFactory()],
      };

      const wrapper = mount(
        <MemoryRouter>
          <Event participation={model} eventSettingsStore={store} />
        </MemoryRouter>,
      );
      const link = wrapper.find(Link).at(0);
      expect(link.prop("to")).toBe("/events/someid/payment");
    });
  });

  describe("Event has settings", () => {
    test("Show link to conference if requireId is false ", () => {
      const model = ParticipantFactory({
        _id: "pid",
        event: EventFactory({
          _id: "someid",
        }),
      });

      const store = new EventSettingsStore("someid");
      store.state = {
        kind: "ready",
        data: EventSettingsFactory({
          requireId: false,
        }),
      };

      const wrapper = mount(
        <MemoryRouter>
          <Event participation={model} eventSettingsStore={store} />
        </MemoryRouter>,
      );

      const link = wrapper.find(Link).at(0);
      expect(link.prop("to")).toBe("/events/someid/verify/pid");
    });

    describe("requireId is true", () => {
      test("Show link to verify identity if user has not been verified", () => {
        const model = ParticipantFactory({
          _id: "pid",
          event: EventFactory({
            _id: "someid",
          }),
        });

        const store = new EventSettingsStore("someid");
        store.state = {
          kind: "ready",
          data: EventSettingsFactory({
            requireId: true,
          }),
        };

        const wrapper = mount(
          <MemoryRouter>
            <Event participation={model} eventSettingsStore={store} />
          </MemoryRouter>,
        );
        const link = wrapper.find(Link).at(0);
        expect(link.prop("to")).toBe("/events/someid/verify/pid");
      });

      test("Show link to conference when identity is verified", () => {
        const model = ParticipantFactory({
          _id: "pid",
          verificationImageUrl: "/some/yrl",
          event: EventFactory({
            _id: "someid",
          }),
        });

        const store = new EventSettingsStore("someid");
        store.state = {
          kind: "ready",
          data: EventSettingsFactory({
            requireId: true,
          }),
        };

        const wrapper = mount(
          <MemoryRouter>
            <Event participation={model} eventSettingsStore={store} />
          </MemoryRouter>,
        );
        const link = wrapper.find(Link).at(0);
        expect(link.prop("to")).toBe("/events/someid/payment");
      });
    });
  });
});
