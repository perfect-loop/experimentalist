import { Document } from "mongoose";
import * as mongoose from 'mongoose';
export declare const EventSchema: mongoose.Schema<any>;
export interface IEvent extends Document {
    _id: string;
    title: string;
    startAt: Date;
    endAt: string;
    active: boolean;
}
export declare const Event: mongoose.Model<IEvent, {}>;
