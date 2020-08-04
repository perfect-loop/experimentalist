import express, { Request, Response, NextFunction } from "express";
import secured from "../lib/middleware/secured";
import { Participation, IParticipation } from "api/Participations";
import { Auth0User } from "types/auth0";
import AttendanceController from "../controllers/AttendanceController";

const router = express.Router();

router.put(
  "/attendance/participants/:participantId/activate",
  secured(),
  async (req: any, res: any, next) => {
    const id = req.params.participantId;
    const user: Auth0User = req.user;

    const participant = (await Participation.findOne({
      _id: id,
      email: user.email
    })) as IParticipation;

    if (!participant) {
      res.status(404).send(`Not found ${id}`);
      return;
    }

    if (!participant.attendedAt) {
      console.log("Setting attenance date");
      participant.attendedAt = new Date();
      await participant.save();
    }
    res.json(participant);
  }
);

router.put(
  "/attendance/participants/:participantId/admit",
  secured(),
  async (req: Request, res: Response, next: NextFunction) => {
    new AttendanceController().admit(req, res, next);
  }
);

export default router;
