import { Document } from "mongoose";
import * as mongoose from 'mongoose';

const STATES = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL",
  "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI",
  "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH",
  "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV",
  "WI", "WY"]

export const UserProfileSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      require: true
    },
    venmoId: {
      type: String,
      require: true
    },
    studentId: {
      type: Number,
      require: true
    },
    phone: {
      type: Number,
      require: true
    },
    street: {
      type: String,
      require: true
    },
    state: {
      type: String,
      enum: STATES,
    },
    zip: {
      type: Number,
      require: true
    },
  },
  {
    timestamps: true
  }
);

export interface IUserProfile extends Document {
  _id: string;
  firstName: string;
  lastName: string;
  venmoId: string;
  studentId: number;
  phone: number;
  street: string;
  state: string;
  zip: number;
}

export const Event = mongoose.model<IUserProfile>("user", UserProfileSchema);
