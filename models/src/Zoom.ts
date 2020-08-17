export enum Role {
  Attendee = 0,
  Host = 1,
  Assistant = 5,
}

export interface IMeetingConfig {
  apiKey: string;
  meetingNumber: number;
  userName?: string;
  passWord: string;
  leaveUrl: string;
  role: Role;
}

export const PARTICIPANT_SUFFIX = "(P)";