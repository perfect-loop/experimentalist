import React from "react";
import { shallow, mount } from "enzyme";
import { Role } from "models/Zoom";
import ConferenceView from "../ConferenceView";
import { PartcipantFactory } from "../../../test/factories/ParticipantFactory";

describe("ConferenceView", () => {
  describe("Attendee", () => {
    const p = PartcipantFactory();
    const wrapper = shallow(<ConferenceView role={Role.Attendee} participant={p} />);
    const instance = wrapper.instance();

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
    test("Register admittance", () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      jest.spyOn(instance, "registerAdmitance");

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      instance.customizeConference();

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      expect(instance.registerAdmitance).toHaveBeenCalled();
    });
  });
  describe("Host", () => {
    const p = PartcipantFactory();
    const wrapper = shallow(<ConferenceView role={Role.Host} participant={p} />);
    const instance = wrapper.instance();

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
    test("Register admittance", () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      jest.spyOn(instance, "registerAdmitance");

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      instance.customizeConference();

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      expect(instance.registerAdmitance).toHaveBeenCalled();
    });
  });
  describe("Assistant", () => {
    const p = PartcipantFactory();
    const wrapper = shallow(<ConferenceView role={Role.Assistant} participant={p} />);
    const instance = wrapper.instance();

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
    test("Register admittance", () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      jest.spyOn(instance, "registerAdmitance");

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      instance.customizeConference();

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      expect(instance.registerAdmitance).toHaveBeenCalled();
    });
  });
});
