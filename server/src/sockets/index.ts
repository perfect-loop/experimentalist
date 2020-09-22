import socket, { Server, Socket } from "socket.io";
import { Api } from "models/Socket";
import logger from "../shared/Logger";
import { IEvent } from "models/Events";
import {
  IParticipationSocket,
  ParticipationSocket
} from "models/ParticpationsSockets";
import { IParticipation, Participation } from "models/Participations";
import { Types } from "mongoose";

export function handleJoinRoomEvent(
  scket: socket.Socket,
  io: Server
): (...args: any[]) => void {
  return (message: Api.Socket.IJoinEventMessage) => {
    updateParticipation(message.participationId).then(
      (p: IParticipationSocket) => {
        logger.info(
          `[updateParticipation] updated ${message.participationId} to have socket ${p}`
        );
        broadcastParticipants(message.eventId, scket);
      }
    );
    joinRoom(message.eventId, scket);
  };

  function updateParticipation(participationId: string) {
    logger.info(
      `[updateParticipation] updating ${participationId} to have socket ${scket.id}`
    );
    const socketId = scket.id;

    const ps = new ParticipationSocket({
      socketId,
      participationId: participationId
    });

    return ps.save();
  }

  function joinRoom(eventId: string, scket: socket.Socket) {
    const roomName = Api.Socket.eventSocketIdByEventId(eventId);
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

function broadcastParticipants(eventId: string, scket: socket.Socket) {
  const roomName = Api.Socket.eventSocketIdByEventId(eventId);
  activeParticipants(eventId).then(array => {
    const message: Api.Socket.IEventParticipationMessage = {
      participant: array.length
    };
    logger.info(
      `[broadcastParticipants] Sending ${JSON.stringify(message)} ${roomName}`
    );
    scket.to(roomName).emit(Api.Socket.EVENT_PARTICIPATION_UPDATE, message);
  });
}

export function handleEventEvent(
  scket: socket.Socket
): (...args: any[]) => void {
  return (message: IEvent) => {
    console.log(`[handleEventEvent] ${JSON.stringify(message)}`);
    scket.broadcast.emit(Api.Socket.EVENT_UPDATED_NAME, message);
  };
}

export function handleBroadcastEvent(
  scket: socket.Socket
): (...args: any[]) => void {
  return (message: Api.Socket.IBroadcastMessage) => {
    console.log(`[handleBroadcastEvent] ${JSON.stringify(message)}`);
    scket.broadcast.emit(Api.Socket.EVENT_BROADCAST_NAME, message);
  };
}

export function handleDisconnect(
  scket: Socket
): Promise<IParticipationSocket | undefined> {
  return deleteRecord(scket);
}

function deleteRecord(
  scket: Socket
): Promise<IParticipationSocket | undefined> {
  const socketId = scket.id;
  logger.info(`[handleDisconnect] Socket disconnected ${scket.id}`);
  return ParticipationSocket.findOne({ socketId: socketId })
    .then(ps => {
      if (!ps) {
        logger.warn(`[deleteRecord] socket with id ${socketId} is not found`);
        return null;
      } else {
        return ps;
      }
    })
    .then(participationSocket => {
      if (participationSocket) {
        logger.info(`[deleteRecord] socket with id ${socketId} is found`);
        Participation.findById(participationSocket.participationId)
          .populate("event")
          .then(p => {
            if (p?.event) {
              broadcastParticipants(p.event.id, scket);
            }
          });
        const a = participationSocket.remove();
        return a;
      }
    });
}

interface IExendedParticipation extends IParticipation {
  participation_sockets: IParticipationSocket[];
}
/**
 * Returns list of participants that are currently logged into the event
 *
 * @param eventId
 */
export function activeParticipants(
  eventId: string
): Promise<IExendedParticipation[]> {
  logger.info(`[activeParticipants] eventId is ${eventId}`);
  return Participation.aggregate([
    {
      $match: {
        event: new Types.ObjectId(eventId),
        role: "attendee"
      }
    },
    {
      $lookup: {
        from: "participation_sockets",
        localField: "_id",
        foreignField: "participationId",
        as: "participation_sockets"
      }
    }
  ]).then((participations: IExendedParticipation[]) => {
    return participations.filter(p => {
      logger.info(`[activeParticipants] number is ${p.participation_sockets}`);
      return p.participation_sockets.length > 0;
    });
  });
}

export function cleanupSockets() {
  logger.info("Cleaning up stale participant sockets records");
  ParticipationSocket.collection.drop();
}
