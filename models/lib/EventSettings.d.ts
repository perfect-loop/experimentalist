import * as mongoose from "mongoose";
import { Document } from "mongoose";
import { IEvent } from "./Events";
export declare const EventSettingsSchema: mongoose.Schema<any>;
export interface IEventSettings extends Document {
    _id: string;
    introVideo: string;
    requireId: boolean;
    paymentMethod: string;
    event: IEvent;
    intelligentReadmit: boolean;
    showInstructions: boolean;
    videoStartTime: Date;
    videoEndTime: Date;
    createdAt: Date;
    updatedAt: Date;
}
export declare const EventSettings: mongoose.Model<IEventSettings, {}>;
