import faker from "faker";
import {
  IParticipationSocket,
  ParticipationSocket
} from "models/ParticpationsSockets";
import { ParticipationFactory } from "./ParticipationFactory";

// interface ParticipationFactory {
//   Attendee: (params: any) => IParticipationSocket;
// }

export function ParticipationSocketFactory(params?: any): IParticipationSocket {
  const r = create(params);
  return r;
}

const create = (params: any) => {
  const participation = ParticipationFactory.Attendee({});
  const p = {
    socketId: faker.random.alphaNumeric(9),
    participationId: ParticipationFactory.Attendee({}) //faker.random.alphaNumeric(9)
  };
  const ps = new ParticipationSocket({ ...p, ...params });
  return ps;
};
