import React from "react";
import { mount, shallow } from "enzyme";
import { MemoryRouter, Link, Redirect } from "react-router-dom";
import ProfileStore from "../../../Profile/storage/ProfileStore";
import PaymentMethod from "..";
import { ProfileFactory } from "../../../../test/factories/ProfileFactory";
import Edit from "../../../Profile/Edit";

describe("PaymentMethod", () => {
  const profileStore = new ProfileStore();
  test("Show edit form", () => {
    const profile = ProfileFactory({
      venmoId: undefined,
    });
    profileStore.state = {
      kind: "ready",
      data: [profile],
    };
    const wrapper = shallow(<PaymentMethod eventId="asdsf" profileStore={profileStore} />);

    expect(wrapper.find(Edit)).toHaveLength(1);
  });

  test("Redirect to event if venmo is set", () => {
    const profile = ProfileFactory({
      venmoId: "sasdff",
    });
    profileStore.state = {
      kind: "ready",
      data: [profile],
    };
    const wrapper = mount(
      <MemoryRouter>
        <PaymentMethod eventId="asdsf" profileStore={profileStore} />
      </MemoryRouter>,
    );

    const redirect = wrapper.find(Redirect);
    expect(redirect).toHaveLength(1);
    expect(redirect.prop("to")).toBe("/events/asdsf/conference");
  });

  test("Show loading", () => {
    profileStore.state = {
      kind: "not_ready",
    };
    const wrapper = shallow(
      <MemoryRouter>
        <PaymentMethod eventId="asdsf" profileStore={profileStore} />
      </MemoryRouter>,
    );

    expect(wrapper.html()).toContain("Loading");
  });
});
