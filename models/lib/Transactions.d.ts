import { Document } from "mongoose";
import * as mongoose from "mongoose";
export interface ITransaction extends Document {
    _id: string;
    date: string;
    transactionId: string;
    method: string;
    compensation: string;
}
export declare const Transaction: mongoose.Model<ITransaction, {}>;
