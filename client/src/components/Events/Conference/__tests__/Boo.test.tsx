import React from "react";
import Boo from "../Boo";
import ParticipantsStore from "../../../VideoConference/store/ParticipantsStore";
import { Role } from "api/Zoom";
import { Auth0User } from "../../../../util/react-auth0-spa";
import { Auth0UserFactory } from "../../../../test/factories/Auth0UserFactory";
import { shallow } from "enzyme";
import { PartcipantFactory } from "../../../../test/factories/ParticipantFactory";
import { Redirect } from "react-router-dom";
import VideoConference from "../../../VideoConference";
import { EventFactory } from "../../../../test/factories/EventFactory";

jest.mock("../../../VideoConference", () => () => "VideoConference");

describe("Participant", () => {
  test("has not attended yet", () => {
    const store = new ParticipantsStore();
    store.state = {
      kind: "ready",
      models: [
        PartcipantFactory({
          role: "attendee",
          attendedAt: undefined,
          event: EventFactory({
            state: "locked",
          }),
        }),
      ],
    };
    const user: Auth0User = Auth0UserFactory();
    const eventId = "1234";
    const wrapper = shallow(<Boo participationsStore={store} role={Role.Host} user={user} eventId={eventId} />);
    expect(wrapper.find(Redirect)).toHaveLength(1);
  });

  test("already opened the event", () => {
    const store = new ParticipantsStore();
    store.state = {
      kind: "ready",
      models: [
        PartcipantFactory({
          role: "attendee",
          attendedAt: new Date(),
          event: EventFactory({
            state: "locked",
          }),
        }),
      ],
    };
    const user: Auth0User = Auth0UserFactory();
    const eventId = "1234";
    const wrapper = shallow(<Boo participationsStore={store} role={Role.Host} user={user} eventId={eventId} />);
    expect(wrapper.html()).toBe("VideoConference");
  });
});

describe("Host", () => {
  test("always allows", () => {
    const store = new ParticipantsStore();
    store.state = {
      kind: "ready",
      models: [
        PartcipantFactory({
          role: "host",
        }),
      ],
    };
    const user: Auth0User = Auth0UserFactory();
    const eventId = "1234";
    const wrapper = shallow(<Boo participationsStore={store} role={Role.Host} user={user} eventId={eventId} />);
    expect(wrapper.html()).toBe("VideoConference");
  });
});

describe("Both Participant & Host", () => {
  test("always allows", () => {
    const store = new ParticipantsStore();
    store.state = {
      kind: "ready",
      models: [
        PartcipantFactory({
          role: "host",
        }),
        PartcipantFactory({
          role: "attendee",
        }),
      ],
    };
    const user: Auth0User = Auth0UserFactory();
    const eventId = "1234";
    const wrapper = shallow(<Boo participationsStore={store} role={Role.Host} user={user} eventId={eventId} />);
    expect(wrapper.html()).toBe("VideoConference");
  });
});
