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
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "participation",
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "participation",
    require: true,
  },
});
CompensationsSchema.index(
  { senderId: 1, receiverId: 1 },
  { unique: true }
);

export interface ICompensation extends Document {
  _id: string;
  amount: number;
  status: string;
  senderId: mongoose.Schema.Types.ObjectId;
  receiverId: mongoose.Schema.Types.ObjectId;
}

export const Compensation = mongoose.model<ICompensation>(
  "compensation",
  CompensationsSchema
);
