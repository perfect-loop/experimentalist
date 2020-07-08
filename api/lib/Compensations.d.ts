import { Document } from "mongoose";
import * as mongoose from "mongoose";
export interface ICompensation extends Document {
    _id: string;
    amount: number;
    status: string;
    sender: string;
    receiver: string;
}
export declare const Compensation: mongoose.Model<ICompensation, {}>;
