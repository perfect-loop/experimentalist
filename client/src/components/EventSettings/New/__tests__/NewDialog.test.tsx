import React from "react";
import { Form } from "react-final-form";
import NewDialog from "../NewDialog";
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

test("Submit the form", async () => {
  const eventId = "234231";
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
