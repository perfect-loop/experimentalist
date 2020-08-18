import { Request, Response, NextFunction } from "express";
import { IParticipation, Participation } from "models/Participations";
import { Auth0User } from "types/auth0";

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
      console.log("Setting attenance date");
      participant.admittedAt = new Date();
      await participant.save();
    }
    res.json(participant);
  }
}
