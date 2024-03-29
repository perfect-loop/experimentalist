import { Document } from "mongoose";
import * as mongoose from "mongoose";
import { IProfile } from "./Profiles";
import { ITransaction } from "./Transactions";
import { ACCEPTED_CURRENCIES } from "./Helpers";

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
  paymentMethod: {
    type: String,
    enum: ["venmo", "paypal"],
  },
  currency: {
    type: String,
    enum: ACCEPTED_CURRENCIES,
    default: "USD",
    require: true,
  }
});

CompensationsSchema.index({ sender: 1, receiver: 1 }, { unique: true });

export interface ICompensation extends Document {
  _id: string;
  amount: number;
  status: string;
  sender: string;
  receiver: string;
  currency: string;
  paymentMethod: string;
}

export interface IUserCompensation {
  profile: IProfile;
  compensation: ICompensation;
  email: string;
  transactions: ITransaction[];
  anonymousName?: string;
}

export const Compensation = mongoose.model<ICompensation>(
  "compensation",
  CompensationsSchema
);
