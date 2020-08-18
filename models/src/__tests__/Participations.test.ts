import { Participation, IParticipation } from "../Participations";
import { Event } from "../Events";

describe("Participations", () => {
  it("anonymous name", async (done: any) => {
    const e = new Event({
      title: "asdf",
    });
    await e.save();
    const p = new Participation({
      event: e.id,
      role: "host",
    });

    expect(1).toBe(1);
  });
});
