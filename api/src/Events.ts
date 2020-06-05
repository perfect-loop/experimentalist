import { Document } from "mongoose";
import * as mongoose from 'mongoose';

const EventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    startAt: { 
      type: Date,
      require: true
    },
    endAt: Date,
    active: Boolean
  },
  {
    timestamps: true
  }
);

export interface IEvent extends Document {
  _id: string;
  title: string;
  startAt: Date;
  endAt: string;
  active: boolean
}

export const Event = mongoose.model<IEvent>("events", EventSchema);