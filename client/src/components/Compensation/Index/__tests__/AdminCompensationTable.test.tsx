import React from "react";
import { shallow, mount } from "enzyme";
import AdminCompensation from "../AdminCompensations";
import IUserCompensation from "api/Compensations";
import CompensationsStore from "../../storage/CompensationsStore";
import { Button } from "@material-ui/core";
import VenmoLogin from "../../../Venmo/Login";
import { FlagsProvider } from "flagged";
import PayPalCompensationsTable from "../PayPalCompensationTable";

jest.mock("../../storage/CompensationsStore");

describe("Compensation Table", () => {
  describe("Venmo", () => {
    const component = (
      <FlagsProvider features={{ venmoLogin: true }}>
        <AdminCompensation eventId={"asdf"} method="venmo" />
      </FlagsProvider>
    );

    beforeEach(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      CompensationsStore.mockImplementation(() => {
        return {
          getAdmin: () => {
            // nothing here
          },
          state: "ready",
          compensations: [],
        };
      });
    });

    test("Venmo login is avaialble", () => {
      const wrapper = mount(component);
      const button = wrapper.find(Button).at(0);
      button.simulate("click");
      expect(wrapper.exists(VenmoLogin)).toBeTruthy();
    });

    test("Venmo login is invisible", () => {
      const wrapper = mount(component);
      expect(wrapper.exists(VenmoLogin)).toBeFalsy();
    });
  });

  describe("PayPal", () => {
    beforeEach(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      CompensationsStore.mockImplementation(() => {
        return {
          getAdmin: () => {
            // nothing here
          },
          state: "ready",
          compensations: [],
        };
      });
    });
    test("Show paypal table", () => {
      const wrapper = shallow(<AdminCompensation eventId={"asdf"} method="paypal" />);
      expect(wrapper.exists(PayPalCompensationsTable)).toBeTruthy();
    });
  });
});
