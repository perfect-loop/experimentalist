import { Document } from "mongoose";
import * as mongoose from "mongoose";
export declare const ProfileSchema: mongoose.Schema<any>;
export interface IProfile extends Document {
    _id: string;
    firstName: string;
    lastName: string;
    venmoId: string;
    studentId: string;
    phone: string;
    street: string;
    state: string;
    zip: string;
    userId: string;
}
export declare const Profile: mongoose.Model<IProfile, {}>;
