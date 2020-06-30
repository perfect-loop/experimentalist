import express from "express";
import secured from "../lib/middleware/secured";
import { ICompensation, Compensation } from "api/Compensations";
import { IParticipation, Participation } from "api/Participations"
import { Auth0User } from "types/auth0";

const router = express.Router();

router.get("/compensation", secured(), async (req: any, res, next) => {
  const email = req.user.email;
  const participant: IParticipation | null = await Participation.findOne({ email });

  if (!participant) {
    res.status(404).send("Event not found!");
    return 
  } else if (participant.role === "host") {
    const senderId = participant._id;
    const compensations: ICompensation[] = await Compensation.find({ senderId });
    res.status(200).json(compensations);
  } else if (participant.role === "attendee") {
    const receiverId = participant._id;
    const compensation: ICompensation | null = await Compensation.findOne({ receiverId });
    res.status(200).json(compensation);
  }

  res.status(200).send("Pong");
})

export default router;