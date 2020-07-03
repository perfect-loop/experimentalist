import React from "react";
import ProfileIndex from "../ProfileIndex";
import axios from "axios";

import { shallow } from "enzyme";

import MockAdapter from "axios-mock-adapter";
import ProfileStore from "../../storage/ProfileStore";
import { Redirect } from "react-router-dom";
import ShowProfile from "../../Show/ShowView";
import { ProfileFactory } from "../../../../test/factories/ProfileFactory";

const mock = new MockAdapter(axios);

test("Loading", () => {
  const profileStore = new ProfileStore();
  const wrapper = shallow(<ProfileIndex profileStore={profileStore} />);
  expect(wrapper.text()).toBe("Loading");
});

test("Redirect to create new profile", () => {
  mock.onGet("/api/profile.json").reply(200, {
    _id: "5ef97a478388323104695d63",
    firstName: "Ilya",
    lastName: "Katz",
    phone: "917-774-5435",
    street: "36 Fair Oaks Street Apt 6",
    state: "CA",
    zip: 94110,
    venmoId: "1234",
    studentId: 12343124,
    userId: "5eec18e8ece613509513f80a",
    createdAt: "2020-06-29T05:21:11.549Z",
    updatedAt: "2020-06-29T05:21:11.549Z",
    __v: 0,
  });

  const profileStore = new ProfileStore();
  profileStore.state = {
    kind: "empty",
  };
  const wrapper = shallow(<ProfileIndex profileStore={profileStore} />);
  const redirect = wrapper.find(Redirect);
  expect(redirect).toHaveLength(1);
  expect(redirect.prop("to")).toBe("/profile/new");
});

test("Show profile", () => {
  const profileStore = new ProfileStore();
  profileStore.state = {
    kind: "ready",
    model: ProfileFactory(),
  };
  const wrapper = shallow(<ProfileIndex profileStore={profileStore} />);
  const p = wrapper.find(ShowProfile);
  expect(p).toHaveLength(1);
});
