import React from "react";
import { shallow, mount } from "enzyme";
import { Role } from "models/Zoom";
import ConferenceView from "../ConferenceView";
import { PartcipantFactory } from "../../../test/factories/ParticipantFactory";
import { fake } from "faker";

describe("ConferenceView", () => {
  const target = jest.fn();
  const event = {
    target,
  };

  describe("FAB", () => {
    const p = PartcipantFactory();

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
    const p = PartcipantFactory();
    const wrapper = shallow(<ConferenceView role={Role.Attendee} participant={p} />);
    const instance = wrapper.instance();

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
    const p = PartcipantFactory();
    const wrapper = shallow(<ConferenceView role={Role.Host} participant={p} />);
    const instance = wrapper.instance();

    describe("Show fab", () => {
      test("False by default", () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        expect(instance.isShowFab()).toBe(true);
      });
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
    const p = PartcipantFactory();
    const wrapper = shallow(<ConferenceView role={Role.Assistant} participant={p} />);
    const instance = wrapper.instance();

    describe("Show fab", () => {
      test("False by default", () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        expect(instance.isShowFab()).toBe(false);
      });
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
