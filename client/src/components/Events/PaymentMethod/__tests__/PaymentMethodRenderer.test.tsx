import React from "react";
import { mount, shallow } from "enzyme";
import { MemoryRouter, Redirect } from "react-router-dom";
import ProfileStore from "../../../Profile/storage/ProfileStore";
import PaymentMethodRenderer from "../PaymentMethodRenderer";
import { ProfileFactory } from "../../../../test/factories/ProfileFactory";
import Edit from "../../../Profile/Edit";
import { EventSettingsStore } from "../../../EventSettings/store/EventSettingsStore";
import { EventSettingsFactory } from "../../../../test/factories/EventSettingsFactory";

describe("PaymentMethodRenderer", () => {
  const profileStore = new ProfileStore();
  const eventId = "asdsf";
  const eventSettingsStore = new EventSettingsStore(eventId);

  describe("EventSettings is present", () => {
    describe("PaymentMethod is venmo", () => {
      it("Redirects to event if venmoId is present", () => {
        const profile = ProfileFactory({
          venmoId: "sasdff",
        });

        profileStore.state = {
          kind: "ready",
          data: [profile],
        };

        eventSettingsStore.state = {
          kind: "ready",
          data: [
            EventSettingsFactory({
              paymentMethod: "venmo",
            }),
          ],
        };

        const wrapper = mount(
          <MemoryRouter>
            <PaymentMethodRenderer
              eventId={eventId}
              profileStore={profileStore}
              eventSettingsStore={eventSettingsStore}
              profileData={profileStore.state.data[0]}
            />
          </MemoryRouter>,
        );

        const redirect = wrapper.find(Redirect);
        expect(redirect).toHaveLength(1);
        expect(redirect.prop("to")).toBe("/events/asdsf/conference");
      });

      it("Renders edit form if venmoId is not present", () => {
        const profile = ProfileFactory({
          venmoId: null,
        });

        profileStore.state = {
          kind: "ready",
          data: [profile],
        };

        eventSettingsStore.state = {
          kind: "ready",
          data: [
            EventSettingsFactory({
              paymentMethod: "venmo",
            }),
          ],
        };

        const wrapper = shallow(
          <PaymentMethodRenderer
            eventId={eventId}
            profileStore={profileStore}
            eventSettingsStore={eventSettingsStore}
            profileData={profileStore.state.data[0]}
          />,
        );

        expect(wrapper.find(Edit)).toHaveLength(1);
      });
    });

    describe("PaymentMethod is not venmo", () => {
      it("Redirects to event if profile is present", () => {
        const profile = ProfileFactory();

        profileStore.state = {
          kind: "ready",
          data: [profile],
        };

        eventSettingsStore.state = {
          kind: "ready",
          data: [
            EventSettingsFactory({
              paymentMethod: "none",
            }),
          ],
        };

        const wrapper = mount(
          <MemoryRouter>
            <PaymentMethodRenderer
              eventId={eventId}
              profileStore={profileStore}
              eventSettingsStore={eventSettingsStore}
              profileData={profileStore.state.data[0]}
            />
          </MemoryRouter>,
        );

        const redirect = wrapper.find(Redirect);
        expect(redirect).toHaveLength(1);
        expect(redirect.prop("to")).toBe("/events/asdsf/conference");
      });

      it("Renders edit form if profile is not present", () => {
        profileStore.state = {
          kind: "ready",
          data: [],
        };

        eventSettingsStore.state = {
          kind: "ready",
          data: [
            EventSettingsFactory({
              paymentMethod: "venmo",
            }),
          ],
        };

        const wrapper = shallow(
          <PaymentMethodRenderer
            eventId={eventId}
            profileStore={profileStore}
            eventSettingsStore={eventSettingsStore}
            profileData={profileStore.state.data[0]}
          />,
        );

        expect(wrapper.find(Edit)).toHaveLength(1);
      });
    });
  });
});
