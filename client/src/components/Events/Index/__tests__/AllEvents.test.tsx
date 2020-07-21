import React from "react";
import { shallow, mount } from "enzyme";
import ParticipantsStore from "../../../VideoConference/store/ParticipantsStore";
import AllEvents from "../AllEvents";
import { PartcipantFactory } from "../../../../test/factories/ParticipantFactory";
import { MemoryRouter } from "react-router-dom";
import { EventFactory } from "../../../../test/factories/EventFactory";

describe("Events", () => {
  test("Show events", () => {
    const store = new ParticipantsStore();
    store.state = {
      kind: "ready",
      models: [
        PartcipantFactory({
          event: EventFactory({
            state: "not_started",
          }),
        }),
        PartcipantFactory({
          event: EventFactory({
            state: "ended",
          }),
        }),
      ],
    };
    const wrapper = shallow(
      <MemoryRouter>
        <AllEvents participationsStore={store} />
      </MemoryRouter>,
    );
    expect(wrapper.html()).toContain("Not Started");
    expect(wrapper.html()).toContain("Ended");
  });
});
