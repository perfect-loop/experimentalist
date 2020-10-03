import { Document } from "mongoose";
import * as mongoose from "mongoose";
import { IEvent } from "./Events";
import { IProfile } from "./Profiles";
export declare const ParticipationsSchema: mongoose.Schema<any>;
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
export declare const Participation: mongoose.Model<IParticipation, {}>;
