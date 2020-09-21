import { define } from "cooky-cutter";
import faker from "faker";
import { EventFactory } from "./EventFactory";
import { IParticipation, IParticipationProfile } from "models/Participations";
import { ProfileFactory } from "./ProfileFactory";

export const ParticipantFactory = define<IParticipation>({
  _id: faker.random.alphaNumeric(9),
  email: faker.internet.email(),
  event: EventFactory(),
  anonymousName: faker.name.findName(),
  role: "attendee",
  instructions: "",
});

export const ParticipationProfileFactory = define<IParticipationProfile>({
  email: faker.internet.email(),
  participant: ParticipantFactory(),
  profile: ProfileFactory(),
});
