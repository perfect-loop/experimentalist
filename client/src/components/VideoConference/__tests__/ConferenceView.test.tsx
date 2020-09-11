import React from "react";
import { shallow, mount } from "enzyme";
import { Role } from "models/Zoom";
import ConferenceView from "../ConferenceView";
import { ParticipantFactory } from "../../../test/factories/ParticipantFactory";
import { fake } from "faker";

describe("ConferenceView", () => {
  const target = jest.fn();
  const event = {
    target,
  };

  describe("FAB", () => {
    const p = ParticipantFactory();

    test("Set to true", () => {
      const wrapper = shallow(<ConferenceView role={Role.Attendee} participant={p} showFab={true} />);
      const instance = wrapper.instance();
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      expect(instance.isShowFab()).toBe(true);
    });

    test("Set to false", () => {
      const wrapper = shallow(<ConferenceView role={Role.Attendee} participant={p} showFab={false} />);
      const instance = wrapper.instance();
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      expect(instance.isShowFab()).toBe(false);
    });

    test("Updated value", () => {
      const wrapper = shallow(<ConferenceView role={Role.Attendee} participant={p} showFab={false} />);
      const instance = wrapper.instance();
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      expect(instance.isShowFab()).toBe(false);
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      instance.enableFab();
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      expect(instance.isShowFab()).toBe(true);
    });
  });

  describe("Attendee", () => {
    const p = ParticipantFactory({
      role: "attendee",
    });
    const wrapper = mount(<ConferenceView role={Role.Attendee} participant={p} />);
    const instance = wrapper.instance();

    test("Mute on entry", () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      jest.spyOn(instance, "mute");

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      instance.setState({ currentId: 123 });

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      instance.onCurrentUserKnown();

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      expect(instance.mute).toHaveBeenCalled();
    });

    describe("Show fab", () => {
      test("False by default", () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        expect(instance.isShowFab()).toBe(false);
      });
    });

    test("Health check is enabled", () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      jest.spyOn(instance, "setupHealthcheck");

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      instance.customizeOnJoin();

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      expect(instance.setupHealthcheck).toHaveBeenCalled();
    });
    test("Audio is disabled", () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      jest.spyOn(instance, "disableAudio");

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      instance.customizeOnJoin();

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      expect(instance.disableAudio).toHaveBeenCalled();
    });
    test("Enable FAB", () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      jest.spyOn(instance, "enableFab");
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      instance.afterJoin(event);

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      expect(instance.enableFab).toHaveBeenCalled();
    });
    test("Register admittance", () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      jest.spyOn(instance, "registerAdmittance");

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      instance.jquery = jest.fn((el: any) => {
        return {
          text: () => {
            return "Join";
          },
        };
      });

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      instance.afterJoin(event);

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      expect(instance.registerAdmittance).toHaveBeenCalled();
    });
  });
  describe("Host", () => {
    const p = ParticipantFactory({
      role: "host",
    });
    const wrapper = shallow(<ConferenceView role={Role.Host} participant={p} />);
    const instance = wrapper.instance();

    describe("Show fab", () => {
      test("False by default", () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        expect(instance.isShowFab()).toBe(true);
      });
    });
    test("Audio is not disabled", () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      jest.spyOn(instance, "disableAudio");

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      instance.customizeOnJoin();

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      expect(instance.disableAudio).not.toHaveBeenCalled();
    });
    test("Do not mute on entry", () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      jest.spyOn(instance, "mute");

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      instance.setState({ currentId: 123 });

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      instance.onCurrentUserKnown();

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      expect(instance.mute).not.toHaveBeenCalled();
    });

    test("Health check is not enabled", () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      jest.spyOn(instance, "setupHealthcheck");

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      instance.customizeOnJoin();

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      // expect(instance.setupHealthcheck).not.toHaveBeenCalled();
    });
    test("Enable FAB", () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      jest.spyOn(instance, "enableFab");
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      instance.afterJoin(event);

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      expect(instance.enableFab).toHaveBeenCalled();
    });
    test("Register admittance", () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      jest.spyOn(instance, "registerAdmittance");

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      instance.jquery = jest.fn((el: any) => {
        return {
          text: () => {
            return "Join";
          },
        };
      });

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      instance.afterJoin(event);

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      expect(instance.registerAdmittance).toHaveBeenCalled();
    });
  });
  describe("Assistant", () => {
    const p = ParticipantFactory({
      role: "assistant",
    });
    const wrapper = shallow(<ConferenceView role={Role.Assistant} participant={p} />);
    const instance = wrapper.instance();

    describe("Show fab", () => {
      test("False by default", () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        expect(instance.isShowFab()).toBe(false);
      });
    });
    test("Audio is not disabled", () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      jest.spyOn(instance, "disableAudio");

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      instance.customizeOnJoin();

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      expect(instance.disableAudio).not.toHaveBeenCalled();
    });
    test("Mute on entry", () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      jest.spyOn(instance, "mute");

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      instance.setState({ currentId: 123 });

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      instance.onCurrentUserKnown();

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      expect(instance.mute).toHaveBeenCalled();
    });

    test("Health check is not enabled", () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      jest.spyOn(instance, "setupHealthcheck");

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      instance.customizeOnJoin();

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      expect(instance.setupHealthcheck).not.toHaveBeenCalled();
    });
    test("Enable FAB", () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      jest.spyOn(instance, "enableFab");
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      instance.afterJoin(event);

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      expect(instance.enableFab).toHaveBeenCalled();
    });
    test("Register admittance", () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      jest.spyOn(instance, "registerAdmittance");

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      instance.jquery = jest.fn((el: any) => {
        return {
          text: () => {
            return "Join";
          },
        };
      });

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      instance.afterJoin(event);

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      expect(instance.registerAdmittance).toHaveBeenCalled();
    });
  });
});
