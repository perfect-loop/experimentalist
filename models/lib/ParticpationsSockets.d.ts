import { Document } from "mongoose";
import * as mongoose from "mongoose";
export declare const ParticipationSocketSchema: mongoose.Schema<any>;
export interface IParticipationSocket extends Document {
    socketId: string;
    participationId: string;
}
export declare const ParticipationSocket: mongoose.Model<IParticipationSocket, {}>;
