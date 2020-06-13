import { Document } from "mongoose";
import * as mongoose from 'mongoose';

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
      enum: ["not_started", "started", "active", "ended"],
      default: "not_started"
    }
  },
  {
    timestamps: true
  }
);

export interface IEvent extends Document {
  _id: string;
  title: string;
  startAt: Date;
  instructions: String;
  endAt: string;
  active: boolean;
  state: "not_started" | "started" | "active" | "ended";
}

export const Event = mongoose.model<IEvent>("events", EventSchema);