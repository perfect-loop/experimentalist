import { Document } from "mongoose";
import * as mongoose from "mongoose";
import { IProfile } from "./Profiles";
import { ITransaction } from "./Transactions";
export interface ICompensation extends Document {
    _id: string;
    amount: number;
    status: string;
    sender: string;
    receiver: string;
}
export interface IUserCompensation {
    profile: IProfile;
    compensation: ICompensation;
    email: string;
    transactions: ITransaction[];
}
export declare const Compensation: mongoose.Model<ICompensation, {}>;
