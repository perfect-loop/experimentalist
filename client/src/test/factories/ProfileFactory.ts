import { define, random } from "cooky-cutter";
import faker from "faker";
import { IProfile } from "api/Profiles";

export const ProfileFactory = define<IProfile>({
  _id: "",
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  venmoId: "1234",
  studentId: "1234",
  phone: "91233432",
  street: faker.address.streetAddress(),
  state: faker.address.state(),
  zip: "9411",
  userId: "123123",
});
