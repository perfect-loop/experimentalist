import { define, random } from "cooky-cutter";
import { Auth0User } from "types/auth0";
import faker from "faker";

export const UserFactory = define<Auth0User>({
  _id: "234245",
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  venmoId: "1234",
  studentId: "1234",
  phone: "91233432",
  street: faker.address.streetAddress(),
  state: faker.address.state(),
  zip: "9411",
  userId: "123123"
});
