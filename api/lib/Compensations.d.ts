import { Document } from "mongoose";
import * as mongoose from "mongoose";
export interface ICompensation extends Document {
    _id: string;
    amount: number;
    status: string;
    sender: mongoose.Schema.Types.ObjectId;
    receiver: mongoose.Schema.Types.ObjectId;
}
export declare const Compensation: mongoose.Model<ICompensation, {}>;
