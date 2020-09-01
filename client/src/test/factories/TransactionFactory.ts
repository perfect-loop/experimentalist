import { define, random } from "cooky-cutter";
import faker from "faker";
import { ITransaction } from "models/Transactions";

export const TransactionFactory = define<ITransaction>({
  _id: "",
  date: "2020-10-10",
  transactionId: faker.random.alphaNumeric,
  method: "get",
  compensation: "10",
});
