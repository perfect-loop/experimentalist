import { Document } from "mongoose";
import * as mongoose from "mongoose";
import { IParticipation, ParticipationsSchema } from "./Participations";

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
    type: ParticipationsSchema,
  },
  receiver: {
    type: ParticipationsSchema,
  },
});
CompensationsSchema.index(
  { "sender._id": 1, "receiver._id": 1 },
  { unique: true }
);

export interface ICompensation extends Document {
  _id: string;
  amount: number;
  status: string;
  sender: IParticipation;
  receiver: IParticipation;
}

export const Compensation = mongoose.model<ICompensation>(
  "compensation",
  CompensationsSchema
);
