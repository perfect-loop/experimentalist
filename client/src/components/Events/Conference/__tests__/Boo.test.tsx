import React from "react";
import Boo from "../Boo";
import ParticipantsStore from "../../../VideoConference/store/ParticipantsStore";
import { Role } from "models/Zoom";
import { Auth0User } from "../../../../util/react-auth0-spa";
import { Auth0UserFactory } from "../../../../test/factories/Auth0UserFactory";
import { shallow } from "enzyme";
import { PartcipantFactory } from "../../../../test/factories/ParticipantFactory";
import { Redirect, MemoryRouter } from "react-router-dom";
import VideoConference from "../../../VideoConference";
import { EventFactory } from "../../../../test/factories/EventFactory";

jest.mock("../../../VideoConference", () => () => "VideoConference");

describe("Participant", () => {
  describe("started event", () => {
    const event = EventFactory({
      state: "started",
    });
    test("already opened the event", () => {
      const store = new ParticipantsStore();
      store.state = {
        kind: "ready",
        models: [
          PartcipantFactory({
            role: "attendee",
            attendedAt: new Date(),
            event,
          }),
        ],
      };
      const user: Auth0User = Auth0UserFactory();
      const eventId = "1234";
      const wrapper = shallow(<Boo participationsStore={store} role={Role.Host} user={user} eventId={eventId} />);
      expect(wrapper.html()).toBe("VideoConference");
    });
    test("did not open event yet", () => {
      const store = new ParticipantsStore();
      store.state = {
        kind: "ready",
        models: [
          PartcipantFactory({
            role: "attendee",
            event,
          }),
        ],
      };
      const user: Auth0User = Auth0UserFactory();
      const eventId = "1234";
      const wrapper = shallow(<Boo participationsStore={store} role={Role.Host} user={user} eventId={eventId} />);
      const redirect = wrapper.find(Redirect);
      expect(redirect).toHaveLength(1);
      expect(redirect.prop("to")).toBe("/events/1234/unavailable");
    });
  });

  describe("locked event", () => {
    const event = EventFactory({
      state: "locked",
    });
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
            event,
          }),
        ],
      };
      const user: Auth0User = Auth0UserFactory();
      const eventId = "1234";
      const wrapper = shallow(<Boo participationsStore={store} role={Role.Host} user={user} eventId={eventId} />);
      const redirect = wrapper.find(Redirect);
      expect(redirect).toHaveLength(1);
      expect(redirect.prop("to")).toBe("/events/1234/unavailable");
    });

    test("already admitted to event", () => {
      const store = new ParticipantsStore();
      store.state = {
        kind: "ready",
        models: [
          PartcipantFactory({
            role: "attendee",
            admittedAt: new Date(),
            attendedAt: new Date(),
            event,
          }),
        ],
      };
      const user: Auth0User = Auth0UserFactory();
      const eventId = "1234";
      const wrapper = shallow(
        <MemoryRouter>
          <Boo participationsStore={store} role={Role.Host} user={user} eventId={eventId} />
        </MemoryRouter>,
      );
      expect(wrapper.html()).toBe("VideoConference");
    });
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

describe("Assistant", () => {
  test("always allows", () => {
    const store = new ParticipantsStore();
    store.state = {
      kind: "ready",
      models: [
        PartcipantFactory({
          role: "assistant",
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
