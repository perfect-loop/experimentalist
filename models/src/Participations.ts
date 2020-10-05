import { Document } from "mongoose";
import * as mongoose from "mongoose";
import { IEvent, EventSchema } from "./Events";
import { IUserSchema, UserSchema } from "./Users";
import { IProfile } from "./Profiles";

export const ParticipationsSchema = new mongoose.Schema(
  {
    email: {
      type: String
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "events"
    },
    role: {
      type: String,
      enum: ["attendee", "host", "assistant"],
      default: "attendee"
    },
    anonymousName: {
      type: String
    },
    instructions: {
      type: String
    },
    attendedAt: {
      type: Date
    },
    admittedAt: {
      type: Date
    },
    participatedAt: {
      type: Date
    },
    verificationImageUrl: {
      type: String
    }
  },
  {
    timestamps: true
  }
);
ParticipationsSchema.index({ email: 1, event: 1, role: 1 }, { unique: true });
ParticipationsSchema.index({ anonymousName: 1, event: 1 }, { unique: true });
// ParticipationsSchema.pre("save", function (next: any) {
//   // @ts-ignore
//   this.anonymousName = Math.trunc(Math.random() * 1000000).toString();
//   next();
// });
ParticipationsSchema.path("verificationImageUrl").validate((value: string) => {
  return value.match(/https?:\/\/.*/);
}, "Image must be valid url");

export interface IParticipation extends Document {
  _id: string;
  email: string;
  event: IEvent;
  role: "attendee" | "host" | "assistant";
  anonymousName: string;
  instructions: string;
  attendedAt?: Date;
  admittedAt?: Date;
  participatedAt?: Date;
  verificationImageUrl?: string;
}

export interface IParticipationProfile {
  profile: IProfile;
  participant: IParticipation;
  email: string;
}

export const Participation = mongoose.model<IParticipation>(
  "participation",
  ParticipationsSchema
);
