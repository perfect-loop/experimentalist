import express from "express";
import secured from "../lib/middleware/secured";
import { IEvent, Event } from "api/Events";
import { Participation, IParticipation } from "api/Participations";
import { Auth0User } from "types/auth0";

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

export default router;
