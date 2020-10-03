import React from "react";
import { mount } from "enzyme";
import SettingsView from "../SettingsView";
import { MemoryRouter } from "react-router-dom";
import { EventSettingsStore } from "../../store/EventSettingsStore";
import { EventSettingsFactory } from "../../../../test/factories/EventSettingsFactory";

describe("SettingsView", () => {
  test("Shows the settings if present", () => {
    const eventId = "skdfsdklf89";
    const eventSettingsStore = new EventSettingsStore(eventId);

    eventSettingsStore.state = {
      kind: "ready",
      data: [
        EventSettingsFactory({
          paymentMethod: "none",
        }),
      ],
    };

    const wrapper = mount(
      <MemoryRouter>
        <SettingsView eventSettingsStore={eventSettingsStore} />
      </MemoryRouter>,
    );

    expect(wrapper.text().includes("None")).toBe(true);
  });
});
