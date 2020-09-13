import { define, random } from "cooky-cutter";
import faker from "faker";
import { ProfileFactory } from "./ProfileFactory";
import { TransactionFactory } from "./TransactionFactory";
import { ICompensation, IUserCompensation } from "models/Compensations";

export const CompensationFactory = define<ICompensation>({
  _id: "",
  amount: 10,
  status: "paid",
  paymentMethod: "venmo",
  sender: faker.internet.email(),
  receiver: faker.internet.email(),
});

export const UserCompensationFactory = define<IUserCompensation>({
  email: faker.internet.email(),
  compensation: CompensationFactory(),
  anonymousName: "122344",
  transactions: [TransactionFactory()],
  profile: ProfileFactory(),
});
