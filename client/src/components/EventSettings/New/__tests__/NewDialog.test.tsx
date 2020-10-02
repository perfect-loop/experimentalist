import React from "react";
import { Form } from "react-final-form";
import { FlagsProvider } from "flagged";
import NewDialog from "../NewDialog";
import RadioButtonAdapter from "../../../Forms/RadioButtonAdapter";
import { MemoryRouter, useHistory } from "react-router-dom";
import { mount } from "enzyme";

jest.mock("../../store/EventSettingsStore", () => {
  return {
    EventSettingsStore: jest.fn().mockImplementation(() => {
      return {
        post: () => {
          return new Promise((resolve, reject) => {
            resolve("success");
          });
        },
      };
    }),
  };
});

const mockHistoryPush = jest.fn(() => {
  console.log("inside push");
});
jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");

  return {
    ...originalModule,
    useHistory: () => ({
      push: mockHistoryPush,
    }),
    useRouteMatch: jest.fn(() => {
      return { url: "/entry" };
    }),
  };
});

const historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };

const flushPromises = () => new Promise(setImmediate);

beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  mockHistoryPush.mockClear();
});

const eventId = "234231";

test("Submit the form", async () => {
  const history = useHistory();

  const wrapper = mount(
    <MemoryRouter>
      <NewDialog eventId={eventId} />
    </MemoryRouter>,
  );
  const form = wrapper.find(Form);
  form.simulate("submit");
  await flushPromises();
  expect(mockHistoryPush).toHaveBeenCalledWith(`/events/${eventId}/host/settings`);
});

describe("Select Payment Method", () => {
  describe("With the select payment method feature flag on", () => {
    test("Renders the paypal radio button", () => {
      const wrapper = mount(
        <FlagsProvider features={{ selectPaymentMethod: true }}>
          <NewDialog eventId={eventId} />
        </FlagsProvider>,
      );

      expect(wrapper.find(RadioButtonAdapter)).toHaveLength(3);
      expect(wrapper.text().includes("PayPal")).toBe(true);
    });
  });

  describe("With the select payment method feature flag off", () => {
    test("does not render the paypal radio button", () => {
      const wrapper = mount(
        <FlagsProvider features={{ selectPaymentMethod: false }}>
          <NewDialog eventId={eventId} />
        </FlagsProvider>,
      );

      expect(wrapper.find(RadioButtonAdapter)).toHaveLength(2);
      expect(wrapper.text().includes("PayPal")).toBe(false);
    });
  });
});
