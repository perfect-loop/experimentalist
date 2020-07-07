/// <reference types="socket.io-client" />
import { IEvent } from "./Events";
export declare module Api {
    module Socket {
        const EVENT_UPDATED_NAME = "EVENT_UPDATED";
        const EVENT_BROADCAST_NAME = "BROADCAST";
        type EVENT_UPDATED = "EVENT_UPDATED";
        type Event = EVENT_UPDATED;
        interface ISocket {
            socketEvent: Event;
            event: IEvent;
        }
        function sendEventEvent(socket: SocketIOClient.Socket, event: IEvent): void;
    }
    interface Error {
        message: string;
    }
}
