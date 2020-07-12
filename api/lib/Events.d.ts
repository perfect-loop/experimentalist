import { Document } from "mongoose";
import * as mongoose from 'mongoose';
export declare const EventSchema: mongoose.Schema<any>;
export interface IEvent extends Document {
    _id: string;
    title: string;
    startAt: Date;
    instructions: String;
    endAt: string;
    active: boolean;
    state: "not_started" | "started" | "active" | "ended" | "locked";
    createdAt: Date;
    updatedAt: Date;
}
export declare const Event: mongoose.Model<IEvent, {}>;
