import { Document } from "mongoose";
import * as mongoose from 'mongoose';
import { IEvent } from "./Events";
export interface IParticipation extends Document {
    _id: string;
    email: string;
    event: IEvent;
    role: "attendee" | "host";
    anonymousName: string;
    instructions: string;
}
export declare const Participation: mongoose.Model<IParticipation, {}>;
