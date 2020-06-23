import { Document } from "mongoose";
import * as mongoose from 'mongoose';
export declare const ProfileSchema: mongoose.Schema<any>;
export interface IProfile extends Document {
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
export declare const Profile: mongoose.Model<IProfile, {}>;
