import { Document } from "mongoose";
import * as mongoose from 'mongoose';
export declare const UserProfileSchema: mongoose.Schema<any>;
export interface IUserProfile extends Document {
    _id: string;
    firstName: string;
    lastName: string;
    venmoId: string;
    studentId: number;
    phone: number;
    street: string;
    state: string;
    zip: number;
}
export declare const Event: mongoose.Model<IUserProfile, {}>;
