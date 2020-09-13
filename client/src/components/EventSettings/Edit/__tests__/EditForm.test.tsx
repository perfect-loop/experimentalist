import React from "react";
import { Form } from "react-final-form";
import { mount } from "enzyme";
import EditForm from "../EditForm";
import { MemoryRouter, useHistory } from "react-router-dom";
import { PartcipantFactory } from "../../../../test/factories/ParticipantFactory";
import { EventFactory } from "../../../../test/factories/EventFactory";
import { EventSettingsFactory } from "../../../../test/factories/EventSettingsFactory";
import { EventSettingsStore } from "../../../EventSettings/store/EventSettingsStore";

jest.mock("../../store/EventSettingsStore", () => {
  return {
    EventSettingsStore: jest.fn().mockImplementation(() => {
      return {
        put: () => {
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

  const model = PartcipantFactory({
    _id: "pid",
    event: EventFactory({
      _id: eventId,
    }),
  });

  const store = new EventSettingsStore("someid");
  store.state = {
    kind: "ready",
    data: EventSettingsFactory({
      requireId: false,
    }),
  };

  const wrapper = mount(
    <MemoryRouter>
      <EditForm eventId={eventId} eventSettings={store.state.data} store={store} />
    </MemoryRouter>,
  );
  const form = wrapper.find(Form);
  form.simulate("submit");
  await flushPromises();
  expect(mockHistoryPush).toHaveBeenCalledWith(`/events/${eventId}/host/settings`);
});
