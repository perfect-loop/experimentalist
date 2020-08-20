import { Request, Response, NextFunction } from "express";
import { IParticipation, Participation } from "models/Participations";
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
      logger.info(`[admit] Participant ${participant._id} already admitted at ${participant.admittedAt}`);
    }
    res.json(participant);
  }
}
