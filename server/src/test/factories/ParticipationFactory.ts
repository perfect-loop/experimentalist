import faker from "faker";
import { EventFactory } from "./EventFactory";
import { IParticipation, Participation } from "models/Participations";

interface ParticipationFactory {
  Attendee: (params: any) => IParticipation;
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
