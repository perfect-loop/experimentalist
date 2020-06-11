import { Document } from "mongoose";
import * as mongoose from 'mongoose';
import { IEvent, EventSchema } from "./Events";
import { IUserSchema, UserSchema } from "./Users";

const ParticipationsSchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    event: {
      type: EventSchema,
    },
    role: {
      type: String,
      enum: ["attendee", "host"],
      default: "attendee"
    },
    anonymousName: {
      type: String
    },
    instructions: {
      type: String
    }
  },
  {
    timestamps: true
  }
);
ParticipationsSchema.index({ "email": 1, "event._id": 1, role: 1 }, { unique: true });

export interface IParticipation extends Document {
  _id: string;
  email: string;
  event: IEvent;
  role: "attendee" | "host";
  anonymousName: string;
  instructions: string;
}

export const Participation = mongoose.model<IParticipation>("participation", ParticipationsSchema);