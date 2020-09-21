/// <reference types="socket.io-client" />
import { IEvent } from "./Events";
export declare module Api {
    module Socket {
        const EVENT_UPDATED_NAME = "EVENT_UPDATED";
        const EVENT_ADMIT_PARTICIPANT = "EVENT_ADMIN_PARTICIPANT";
        const EVENT_BROADCAST_NAME = "BROADCAST";
        const EVENT_JOIN_EVENT_NAME = "JOIN_EVENT";
        type EVENT_UPDATED = "EVENT_UPDATED";
        type Event = EVENT_UPDATED;
        interface ISocket {
            socketEvent: Event;
            event: IEvent;
        }
        interface IEventAdmitParticipant {
            userId: number;
        }
        interface IBroadcastMessage {
            eventId: string;
            message: string;
        }
        interface IJoinEventMessage {
            roomName: string;
            participationId: string;
        }
        function sendBroadcast(socket: SocketIOClient.Socket, eventId: string, message: string): void;
        function sendEventEvent(socket: SocketIOClient.Socket, event: IEvent): void;
        function joinEvent(socket: SocketIOClient.Socket, message: IJoinEventMessage): void;
        function eventSocketId(event: IEvent): string;
        function eventSocketIdByEventId(eventId: string): string;
    }
    interface Error {
        message: string;
    }
}
