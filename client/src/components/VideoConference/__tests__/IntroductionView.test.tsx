import React from "react";
import { shallow } from "enzyme";
import IntroductionView from "../intro/IntroductionView";
import { ParticipantFactory } from "../../../test/factories/ParticipantFactory";
import { Dialog } from "@material-ui/core";
import { EventSettingsStore } from "../../EventSettings/store/EventSettingsStore";
import { EventSettingsFactory } from "../../../test/factories/EventSettingsFactory";

describe("IntroductionView", () => {
  const eventId = "skdfsdklf89";
  const eventSettingsStore = new EventSettingsStore(eventId);
  eventSettingsStore.state = {
    kind: "ready",
    data: [EventSettingsFactory()],
  };
  describe("Host", () => {
    const p = ParticipantFactory({
      role: "host",
    });

    test("Do not show introduction video", () => {
      const wrapper = shallow(<IntroductionView participant={p} eventSettingsStore={eventSettingsStore} />);
      expect(wrapper.find(Dialog)).toHaveLength(0);
    });
  });

  describe("Attendee", () => {
    const p = ParticipantFactory({
      role: "attendee",
    });

    test("Show introduction video", () => {
      const wrapper = shallow(<IntroductionView participant={p} eventSettingsStore={eventSettingsStore} />);
      expect(wrapper.find(Dialog)).toHaveLength(1);
    });

    test("Not intro video configured", () => {
      eventSettingsStore.state = {
        kind: "ready",
        data: EventSettingsFactory({
          introVideo: undefined,
        }),
      };
      const wrapper = shallow(<IntroductionView participant={p} eventSettingsStore={eventSettingsStore} />);
      expect(wrapper.find(Dialog)).toHaveLength(0);
    });

    test("Nothing to show yet", () => {
      eventSettingsStore.state = {
        kind: "not_ready",
      };
      const wrapper = shallow(<IntroductionView participant={p} eventSettingsStore={eventSettingsStore} />);
      expect(wrapper.find(Dialog)).toHaveLength(0);
    });
  });
});
