import { canShowSpeedDial } from "../helpers";
import { ParticipantFactory } from "../../../../test/factories/ParticipantFactory";
import { EventSettingsFactory } from "../../../../test/factories/EventSettingsFactory";

describe("canShowSpeedDial", () => {
  describe("host", () => {
    const participant = ParticipantFactory({
      role: "host",
    });

    const eventSettings = EventSettingsFactory({
      showInstructions: false,
    });

    it("returns true", () => {
      const value = canShowSpeedDial(participant, eventSettings);
      expect(value).toBe(true);
    });
  });
  describe("assistant", () => {
    const participant = ParticipantFactory({
      role: "assistant",
    });

    const eventSettings = EventSettingsFactory({
      showInstructions: false,
    });

    it("returns true", () => {
      const value = canShowSpeedDial(participant, eventSettings);
      expect(value).toBe(true);
    });
  });

  describe("attendee", () => {
    const participant = ParticipantFactory({
      role: "attendee",
    });

    describe("event settings not present", () => {
      it("returns true", () => {
        const value = canShowSpeedDial(participant, null);
        expect(value).toBe(true);
      });
    });

    describe("event settings present", () => {
      describe("showInstructions is true", () => {
        const eventSettings = EventSettingsFactory({
          showInstructions: true,
        });

        it("returns true", () => {
          const value = canShowSpeedDial(participant, eventSettings);
          expect(value).toBe(true);
        });
      });

      describe("showInstructions is false", () => {
        const eventSettings = EventSettingsFactory({
          showInstructions: false,
        });

        it("returns false", () => {
          const value = canShowSpeedDial(participant, eventSettings);
          expect(value).toBe(false);
        });
      });
    });
  });
});
