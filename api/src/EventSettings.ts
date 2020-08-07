import * as mongoose from 'mongoose';
import { Document } from "mongoose";
import { IEvent } from './Events';

export const EventSettingsSchema = new mongoose.Schema(
  {
    introVideo: {
      type: String,
      required: true,
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "events",
    },
  },
  {
    timestamps: true
  }
);

export interface IEventSettings extends Document {
  _id: string;
  introVideo: string;
  event: IEvent;
  createdAt: Date;
  updatedAt: Date ;
}

export const EventSettings = mongoose.model<IEventSettings>("event_settings", EventSettingsSchema);