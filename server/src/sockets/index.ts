import socket, { Socket } from "socket.io";
import { Api } from "models/Socket"
import logger from "../shared/Logger";
import { IEvent } from "models/Events";

export function handleJoinRoomEvent(scket: socket.Socket, io: socket.Server): (...args: any[]) => void {
  return (message: Api.Socket.IJoinEventMessage) => {
    const roomName = message.roomName;
    joinRoom(roomName, scket);
  };

  function joinRoom(roomName: string,scket: socket.Socket) {
    scket.join(roomName);
    logger.info(`[handleJoinRoomEvent] ${JSON.stringify(roomName)}`);
    const clients = io.sockets.adapter.rooms[roomName];
    if (clients.length && clients.length > 0) {
      logger.info(
        `[handleJoinRoomEvent] number of clients in ${roomName} is ${clients.length}`
      );
    } else {
      logger.error(
        `[handleJoinRoomEvent] noone joined ${roomName} but expecting at least one`
      );
    }
  }
}

export function handleEventEvent(scket: socket.Socket): (...args: any[]) => void {
  return (message: IEvent) => {
    console.log(`[handleEventEvent] ${JSON.stringify(message)}`);
    scket.broadcast.emit(Api.Socket.EVENT_UPDATED_NAME, message);
  };
}

export function handleBroadcastEvent(scket: socket.Socket): (...args: any[]) => void {
  return (message: Api.Socket.IBroadcastMessage) => {
    console.log(`[handleBroadcastEvent] ${JSON.stringify(message)}`);
    scket.broadcast.emit(Api.Socket.EVENT_BROADCAST_NAME, message);
  };
}

export function handleDisconnect(scket: Socket): (...args: any[]) => void {
  return () => {
    logger.info(`[handleDisconnect] Socket disconnected ${scket.id}`);
  };
}