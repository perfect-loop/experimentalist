import React from "react";
import { mount, shallow } from "enzyme";
import { MemoryRouter, Redirect } from "react-router-dom";
import ProfileStore from "../../../Profile/storage/ProfileStore";
import PaymentMethod from "..";
import PaymentMethodRenderer from "../PaymentMethodRenderer";
import { ProfileFactory } from "../../../../test/factories/ProfileFactory";
import Edit from "../../../Profile/Edit";

describe("PaymentMethod", () => {
  const profileStore = new ProfileStore();
  it("renders the PaymentMethodRenderer", () => {
    const profile = ProfileFactory({
      venmoId: undefined,
    });
    profileStore.state = {
      kind: "ready",
      data: [profile],
    };
    const wrapper = shallow(<PaymentMethod eventId="asdsf" profileStore={profileStore} />);

    expect(wrapper.find(PaymentMethodRenderer)).toHaveLength(1);
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
