import * as mongoose from 'mongoose';
export declare const UserSchema: mongoose.Schema<any>;
export interface IUserSchema extends Document {
    _id: string;
}
export declare const User: mongoose.Model<mongoose.Document, {}>;
