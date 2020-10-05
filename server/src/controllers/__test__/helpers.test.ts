import { setParticipantsAsParticipated } from "../helpers";
import { EventFactory } from "../../test/factories/EventFactory";
import { ParticipationSocketFactory } from "../../test/factories/ParticipationSocketFactory";
import { ParticipationFactory } from "../../test/factories/ParticipationFactory";

describe("helpers", () => {
  it("sets participants as participated", async (done: any) => {
    const event = await EventFactory().save();
    const p1 = await ParticipationFactory.Attendee({
      event
    }).save();

    await ParticipationSocketFactory({
      participationId: p1._id
    }).save();

    setParticipantsAsParticipated(event).then(res => {
      expect(res).toBe(1);
      done();
    });
  });

  it("does not update participant from different event", async (done: any) => {
    const event = await EventFactory().save();
    const event1 = await EventFactory().save();
    const p1 = await ParticipationFactory.Attendee({
      event
    }).save();

    await ParticipationSocketFactory({
      participationId: p1._id
    }).save();

    setParticipantsAsParticipated(event1).then(res => {
      expect(res).toBe(0);
      done();
    });
  });

  it("does not update participant who is not logged in", async (done: any) => {
    const event = await EventFactory().save();
    const p1 = await ParticipationFactory.Attendee({
      event
    }).save();

    setParticipantsAsParticipated(event).then(res => {
      expect(res).toBe(0);
      done();
    });
  });
});
