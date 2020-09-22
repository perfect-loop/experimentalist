import { Document } from "mongoose";
import * as mongoose from "mongoose";

export const ParticipationSocketSchema = new mongoose.Schema(
  {
    socketId: {
      type: String,
    },
    participationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "participation_sockets",
    },
  },
  {
    timestamps: true,
  }
);

ParticipationSocketSchema.index(
  { socketId: 1, participation: 1 },
  { unique: true }
);

export interface IParticipationSocket extends Document {
  socketId: string;
  participationId: string;
}

export const ParticipationSocket = mongoose.model<IParticipationSocket>(
  "participation_socket",
  ParticipationSocketSchema
);


