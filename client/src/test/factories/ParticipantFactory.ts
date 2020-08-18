import { define, random } from "cooky-cutter";
import faker from "faker";
import { EventFactory } from "./EventFactory";
import { IParticipation } from "models/Participations";

export const PartcipantFactory = define<IParticipation>({
  _id: "",
  email: faker.internet.email(),
  event: EventFactory(),
  anonymousName: faker.name.findName(),
  role: "attendee",
  instructions: "",
});
