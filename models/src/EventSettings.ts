import { BooleanAlgebra } from "fp-ts/lib/BooleanAlgebra";
import * as mongoose from "mongoose";
import { Document } from "mongoose";
import { IEvent } from "./Events";

export const EventSettingsSchema = new mongoose.Schema(
  {
    introVideo: {
      type: String
    },
    requireId: {
      type: Boolean,
      default: true
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "events"
    },
    paymentMethod: {
      type: String,
      enum: ["venmo", "paypal", "none"],
      default: "venmo"
    },
    intelligentReadmit: {
      type: Boolean,
      default: false
    },
  },
  {
    timestamps: true
  }
);

export interface IEventSettings extends Document {
  _id: string;
  introVideo: string;
  requireId: boolean;
  paymentMethod: string;
  event: IEvent;
  intelligentReadmit: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const EventSettings = mongoose.model<IEventSettings>(
  "event_settings",
  EventSettingsSchema
);
