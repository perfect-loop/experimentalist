import { Document } from "mongoose";
import * as mongoose from "mongoose";
import { IParticipation } from "./Participations";
export interface ICompensation extends Document {
    _id: string;
    amount: number;
    status: string;
    sender: IParticipation;
    receiver: IParticipation;
}
export declare const Compensation: mongoose.Model<ICompensation, {}>;
