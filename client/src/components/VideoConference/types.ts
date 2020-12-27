export interface IAttendee {
  audio: string;
  isHost: boolean;
  isHold: boolean;
  muted: boolean;
  participantId: number;
  userId: number;
  userName: string;
}

export interface IAttendeeList {
  attendeesList: IAttendee[];
}

export interface IZoomResult {
  result?: IAttendeeList;
  status: boolean;
  errorCode: number;
  errorMessage: string;
}

export enum IZoomConnection {
  CONNECTING = 1,
  CONNECTED = 2,
  DISCONNECTED = 3,
  RECONNECTING = 4,
}
