import faker from "faker";
import { EventFactory } from "./EventFactory";
import { IParticipation, Participation } from "api/Participations";

interface ParticipationFactory {
  Attendee: () => IParticipation;
}
export const ParticipationFactory: ParticipationFactory = {
  Attendee: (params = {}): IParticipation => {
    const p = {
      email: faker.internet.email(),
      event: EventFactory(),
      anonymousName: faker.name.findName(),
      role: "attendee",
      instructions: ""
    };
    const participation = new Participation({ ...p, ...params });
    return participation;
  }
};
