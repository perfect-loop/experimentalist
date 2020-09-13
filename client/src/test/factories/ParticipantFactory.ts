import { define, random } from "cooky-cutter";
import faker from "faker";
import { EventFactory } from "./EventFactory";
import { IParticipation, IParticipationProfile } from "models/Participations";
import { ProfileFactory } from "./ProfileFactory";

export const PartcipantFactory = define<IParticipation>({
  _id: "",
  email: faker.internet.email(),
  event: EventFactory(),
  anonymousName: faker.name.findName(),
  role: "attendee",
  instructions: "",
});

export const ParticipationProfileFactory = define<IParticipationProfile>({
  email: faker.internet.email(),
  participant: PartcipantFactory(),
  profile: ProfileFactory(),
});
