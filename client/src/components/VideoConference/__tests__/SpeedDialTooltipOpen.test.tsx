import React from "react";
import { shallow } from "enzyme";
import IntroductionView from "../intro/IntroductionView";
import { ParticipantFactory } from "../../../test/factories/ParticipantFactory";
import { Dialog } from "@material-ui/core";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import SpeedDialTooltipOpen from "../speeddial/SpeedDialTooltipOpen";

const handle = jest.fn();
describe("SpeedDialTooltipOpen", () => {
  describe("Host", () => {
    const p = ParticipantFactory({
      role: "host",
    });

    test("Show host options", () => {
      const wrapper = shallow(<SpeedDialTooltipOpen participant={p} handleBroadcastClickOpen={handle} />);
      expect(wrapper.find(SpeedDialAction)).toHaveLength(4);
    });
  });
  describe("Attendee", () => {
    const p = ParticipantFactory({
      role: "attendee",
    });

    test("Show only participant options", () => {
      const wrapper = shallow(<SpeedDialTooltipOpen participant={p} handleBroadcastClickOpen={handle} />);
      expect(wrapper.find(SpeedDialAction)).toHaveLength(1);
    });
  });
  describe("Assistant", () => {
    const p = ParticipantFactory({
      role: "assistant",
    });

    test("Show assistant options", () => {
      const wrapper = shallow(<SpeedDialTooltipOpen participant={p} handleBroadcastClickOpen={handle} />);
      expect(wrapper.find(SpeedDialAction)).toHaveLength(3);
    });
  });
});
