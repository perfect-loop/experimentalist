import { Document } from "mongoose";
import * as mongoose from 'mongoose';
export declare const VenmoTokenSchema: mongoose.Schema<any>;
export interface IVenmoToken extends Document {
    _id: string;
    token: string;
}
export declare const VenmoToken: mongoose.Model<IVenmoToken, {}>;
