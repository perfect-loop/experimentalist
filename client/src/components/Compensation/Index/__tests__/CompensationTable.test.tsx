import React from "react";
import { mount } from "enzyme";
import CompensationTable from "../PayPalCompensationTable";
import { UserCompensationFactory } from "../../../../test/factories/CompensationFactory";

describe("CompensationTable", () => {
  test("Shows the compensations", () => {
    const compensations = [UserCompensationFactory({ email: "test@yahoo.com", anonymousName: "1231231" })];

    const wrapper = mount(<CompensationTable compensations={compensations} />);

    expect(wrapper.text().includes("Anonymized Name")).toBe(true);
    expect(wrapper.text().includes("1231231")).toBe(true);
  });
});
