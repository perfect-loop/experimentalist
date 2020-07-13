import React from "react";
import { shallow, mount } from "enzyme";
import AdminCompensation, { IUserCompensation } from "../AdminCompensations";
import CompensationsStore from "../../storage/CompensationsStore";
import { Button } from "@material-ui/core";
import VenmoLogin from "../../../Venmo/Login";

jest.mock("../../storage/CompensationsStore");

describe("Compensation Table", () => {
  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    CompensationsStore.mockImplementation(() => {
      return {
        getAdmin: () => {
          // nothing here
        },
        state: {
          kind: "ready",
          model: [],
        },
      };
    });
  });

  test("Venmo login is avaialble", () => {
    const wrapper = mount(<AdminCompensation eventId={"asdf"} />);
    const button = wrapper.find(Button).at(0);
    button.simulate("click");
    expect(wrapper.exists(VenmoLogin)).toBeTruthy();
  });

  test("Venmo login is invisible", () => {
    const wrapper = mount(<AdminCompensation eventId={"asdf"} />);
    expect(wrapper.exists(VenmoLogin)).toBeFalsy();
  });
});
