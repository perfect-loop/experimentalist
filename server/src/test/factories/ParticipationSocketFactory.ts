import { define } from "cooky-cutter";
import faker from "faker";
import {
  IParticipationSocket,
  ParticipationSocket
} from "models/ParticpationsSockets";

// interface ParticipationFactory {
//   Attendee: (params: any) => IParticipationSocket;
// }

export function ParticipationSocketFactory(params?: any): IParticipationSocket {
  return create(params);
}

const create = (params: any): IParticipationSocket => {
  const p = {
    socketId: faker.random.alphaNumeric(9),
    participation: "5f6ab5fdbf51f13b1b71ad0e" //faker.random.alphaNumeric(9)
  };
  const ps = new ParticipationSocket({ ...p, ...params });
  return ps;
};
