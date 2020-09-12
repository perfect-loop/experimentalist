import React from "react";
import { mount } from "enzyme";
import ParticipantsTable from "../ParticipantsTable";
import { ParticipationProfileFactory, ParticipantFactory } from "../../../../test/factories/ParticipantFactory";

describe("ParticipantsTable", () => {
  test("Shows the participants", () => {
    const participant = ParticipantFactory({ email: "test@yahoo.com" });
    const participantProfile = ParticipationProfileFactory({
      participant,
    });

    const wrapper = mount(<ParticipantsTable participants={[participantProfile]} />);

    expect(wrapper.text().includes("Email")).toBe(true);
    expect(wrapper.text().includes("test@yahoo.com")).toBe(true);
  });
});
