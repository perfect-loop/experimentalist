import { IParticipation } from "./Participations";
export interface ParticipantUploadError {
    code: number;
    errmsg: string;
    index: number;
    op: IParticipation;
}
