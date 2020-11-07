import { Request, Response, NextFunction } from "express";
import { Event, IEvent } from "models/Events";
import { isHost } from "./helpers";
import { IParticipation, Participation } from "models/Participations";
import {
  ParticipationSocket,
  IParticipationSocket
} from "models/ParticpationsSockets";
import { Auth0User } from "types/auth0";
import logger from "../shared/Logger";

export default class AttendanceController {
  public async admit(req: Request, res: Response, next: NextFunction) {
    const id = req.params.participantId;
    const user = req.user as Auth0User;

    const participant = (await Participation.findOne({
      _id: id,
      email: user.email
    })) as IParticipation;

    if (!participant) {
      res.status(404).send(`Not found ${id}`);
      return;
    }

    if (!participant.admittedAt) {
      logger.info(`[admit] Setting attenance date ${participant._id}`);
      participant.admittedAt = new Date();
      await participant.save();
    } else {
      logger.info(
        `[admit] Participant ${participant._id} already admitted at ${participant.admittedAt}`
      );
    }
    res.json(participant);
  }

  public async remove(req: Request, res: Response, next: NextFunction) {
    const anonymousName = req.body.anonymousName;
    const eventId = req.body.eventId;
    const user = req.user as Auth0User;

    const event = await Event.findById(eventId);

    if (!user) {
      res.status(403).send("Unauthorized");
      return;
    }

    if (!event) {
      res.status(404).send("Event not found");
      return;
    }

    if (!(await isHost(user, event))) {
      res.status(403).send("Unauthorized");
      return;
    }

    const participant = (await Participation.findOne({
      anonymousName: anonymousName,
      event: event
    })) as IParticipation;

    if (!participant) {
      res.status(404).send(`Not found with anonymousName ${anonymousName}`);
      return;
    }

    const participantSocket = (await ParticipationSocket.findOne({
      participationId: participant._id
    })) as IParticipationSocket;

    if (!participantSocket) {
      res
        .status(404)
        .send(
          `ParticipantSocket Not found with participantId ${participant._id}`
        );
      return;
    }

    logger.info(`Removing participant socket for ${participant._id}`);

    await participantSocket.remove();
    res.json({ message: "Participant removed" });
  }
}
