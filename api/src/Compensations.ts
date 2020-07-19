import { Document } from "mongoose";
import * as mongoose from "mongoose";
import { IParticipation, ParticipationsSchema } from "./Participations";
import { IProfile } from "./Profiles";
import { ITransaction } from "./Transactions";

const CompensationsSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["Unpaid", "Paid"],
    default: "Unpaid",
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "participation",
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "participation",
    require: true,
  },
});
CompensationsSchema.index(
  { sender: 1, receiver: 1 },
  { unique: true }
);

export interface ICompensation extends Document {
  _id: string;
  amount: number;
  status: string;
  sender: string;
  receiver: string;
}

export interface IUserCompensation {
  profile: IProfile;
  compensation: ICompensation;
  email: string;
  transactions: ITransaction[];
}

export const Compensation = mongoose.model<ICompensation>(
  "compensation",
  CompensationsSchema
);
