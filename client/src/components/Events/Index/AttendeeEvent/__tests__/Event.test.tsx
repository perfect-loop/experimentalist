import React from "react";
import { MemoryRouter, Link } from "react-router-dom";
import { shallow, mount } from "enzyme";
import { PartcipantFactory } from "../../../../../test/factories/ParticipantFactory";
import { EventFactory } from "../../../../../test/factories/EventFactory";
import { EventSettingsFactory } from "../../../../../test/factories/EventSettingsFactory";
import Event from "../Event";
import { EventSettingsStore } from "../../../../EventSettings/store/EventSettingsStore";

describe("Event", () => {
  describe("Event has no settings", () => {
    test("Show link to verify identity if user has not been verified", () => {
      const model = PartcipantFactory({
        _id: "pid",
        event: EventFactory({
          _id: "someid",
        }),
      });

      const store = new EventSettingsStore("someid");
      store.state = {
        kind: "ready",
        data: null,
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
      const model = PartcipantFactory({
        _id: "pid",
        verificationImageUrl: "/some/yrl",
        event: EventFactory({
          _id: "someid",
        }),
      });

      const store = new EventSettingsStore("someid");
      store.state = {
        kind: "ready",
        data: null,
      };

      const wrapper = mount(
        <MemoryRouter>
          <Event participation={model} eventSettingsStore={store} />
        </MemoryRouter>,
      );
      const link = wrapper.find(Link).at(0);
      expect(link.prop("to")).toBe("/events/someid/conference");
    });
  });

  describe("Event has settings", () => {
    test("Show link to conference if requireId is false ", () => {
      const model = PartcipantFactory({
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
      expect(link.prop("to")).toBe("/events/someid/conference");
    });

    describe("requireId is true", () => {
      test("Show link to verify identity if user has not been verified", () => {
        const model = PartcipantFactory({
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
        const model = PartcipantFactory({
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
        expect(link.prop("to")).toBe("/events/someid/conference");
      });
    });
  });
});
