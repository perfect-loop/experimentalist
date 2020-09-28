import faker from "faker";
import { EventFactory } from "./EventFactory";
import { IParticipation, Participation } from "models/Participations";

interface ParticipationFactory {
  Attendee: (params: any) => IParticipation;
  Host: (params: any) => IParticipation;
  Assistant: (params: any) => IParticipation;
}

export const ParticipationFactory: ParticipationFactory = {
  Attendee: (params = {}): IParticipation => {
    return createParticipation(params, "attendee");
  },
  Assistant: (params = {}): IParticipation => {
    return createParticipation(params, "assistant");
  },
  Host: (params = {}): IParticipation => {
    return createParticipation(params, "host");
  }
};

const createParticipation = (params: any, role: string) => {
  const p = {
    email: faker.internet.email(),
    event: EventFactory(),
    anonymousName: faker.name.findName(),
    role,
    instructions: ""
  };
  const participation = new Participation({ ...p, ...params });
  return participation;
};
