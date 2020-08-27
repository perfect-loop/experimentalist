import { Document } from "mongoose";
import * as mongoose from 'mongoose';

export const VenmoTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true
  }
);

export interface IVenmoToken extends Document {
  _id: string;
  token: string;
}

export const VenmoToken = mongoose.model<IVenmoToken>("venmo_tokens", VenmoTokenSchema);