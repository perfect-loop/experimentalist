import React from "react";
import { shallow } from "enzyme";
import ParticipantsStore from "../../storage/ParticipantsStore";
import EventStore from "../../storage/EventStore";
import AllParticipants from "../AllParticipants";
import ParticipantsTable from "../ParticipantsTable";
import UploadErrors from "../UploadErrors";

describe("Events", () => {
  test("Show events", () => {
    const eventStore = new EventStore();
    eventStore.state = {
      kind: "ready",
    };

    const participantsStore = new ParticipantsStore();
    participantsStore.state = "ready";

    const wrapper = shallow(<AllParticipants eventStore={eventStore} participantsStore={participantsStore} />);

    expect(wrapper.find(ParticipantsTable)).toHaveLength(1);
    expect(wrapper.find(UploadErrors)).toHaveLength(1);
  });
});
