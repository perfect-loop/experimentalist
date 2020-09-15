import { define, random } from "cooky-cutter";
import faker from "faker";
import { IProfile } from "models/Profiles";

export const ProfileFactory = define<IProfile>({
  _id: "",
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  venmoId: "1234",
  venmoHandle: "CherryLam",
  userId: "123123",
});
