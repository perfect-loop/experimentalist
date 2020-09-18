import { IEvent } from "./Events";

export module Api {
  export module Socket {
    export const EVENT_UPDATED_NAME = "EVENT_UPDATED"
    export const EVENT_ADMIT_PARTICIPANT = "EVENT_ADMIN_PARTICIPANT";
    export const EVENT_BROADCAST_NAME = "BROADCAST"
    export type EVENT_UPDATED = "EVENT_UPDATED";
    export type Event = EVENT_UPDATED;
    export interface ISocket {
      socketEvent: Event,
      event: IEvent;
    }

    export interface IEventAdmitParticipant {
      userId: number;
    }

    export interface IBroadcastMessage {
      eventId: string;
      message: string;
    }

    export function sendBroadcast(socket: SocketIOClient.Socket, eventId: string, message: string){
      const broadcastMessage: IBroadcastMessage = {
        eventId, message
      }
      socket.emit(Api.Socket.EVENT_BROADCAST_NAME, broadcastMessage);
    }

    export function sendEventEvent(socket: SocketIOClient.Socket, event: IEvent) {
      socket.emit(EVENT_UPDATED_NAME, { event });
    }
  }

  export interface Error {
    message: string;
  }
}