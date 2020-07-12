import { Document } from "mongoose";
import * as mongoose from 'mongoose';
import { isStarted, isLocked } from "./Helpers";

export const EventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    startAt: {
      type: Date,
      require: true
    },
    instructions: {
      type: String,
    },
    endAt: Date,
    active: Boolean,
    state: {
      type: String,
      enum: ["not_started", "started", "active", "locked", "ended"],
      default: "not_started"
    }
  },
  {
    timestamps: true
  }
);

EventSchema.methods.isLocked = function() {
  return isLocked(this as IEvent);
}

EventSchema.methods.isStarted = function() {
  return isStarted(this as IEvent);
}

export interface IEvent extends Document {
  _id: string;
  title: string;
  startAt: Date;
  instructions: String;
  endAt: string;
  active: boolean;
  state: "not_started" | "started" | "active" | "ended" | "locked";
  createdAt: Date;
  updatedAt: Date ;
}

export const Event = mongoose.model<IEvent>("events", EventSchema);