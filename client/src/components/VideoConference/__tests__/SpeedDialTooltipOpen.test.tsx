import React from "react";
import { shallow } from "enzyme";
import IntroductionView from "../intro/IntroductionView";
import SpeedDialTooltipOpen from "../SpeedDialTooltipOpen";
import { PartcipantFactory } from "../../../test/factories/ParticipantFactory";
import { Dialog } from "@material-ui/core";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";

const handle = jest.fn();
describe("SpeedDialTooltipOpen", () => {
  describe("Host", () => {
    const p = PartcipantFactory({
      role: "host",
    });

    test("Do not show introduction video", () => {
      const wrapper = shallow(<SpeedDialTooltipOpen participant={p} handleBroadcastClickOpen={handle} />);
      expect(wrapper.find(SpeedDialAction)).toHaveLength(4);
    });
  });
  describe("Attendee", () => {
    const p = PartcipantFactory({
      role: "attendee",
    });

    test("Do not show introduction video", () => {
      const wrapper = shallow(<SpeedDialTooltipOpen participant={p} handleBroadcastClickOpen={handle} />);
      expect(wrapper.find(SpeedDialAction)).toHaveLength(1);
    });
  });
  describe("Assistant", () => {
    const p = PartcipantFactory({
      role: "assistant",
    });

    test("Do not show introduction video", () => {
      const wrapper = shallow(<SpeedDialTooltipOpen participant={p} handleBroadcastClickOpen={handle} />);
      expect(wrapper.find(SpeedDialAction)).toHaveLength(4);
    });
  });
});
