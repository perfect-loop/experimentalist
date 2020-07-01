import express from "express";
import secured from "../lib/middleware/secured";
import { ICompensation, Compensation } from "api/Compensations";
import { IParticipation, Participation } from "api/Participations";
import { Auth0User } from "types/auth0";
import { Schema } from "mongoose";

const router = express.Router();

router.get("/compensation.json", secured(), async (req: any, res, next) => {
  const email = req.user.email;
  const participation: IParticipation[] = await Participation.find({
    email
  });

  if (participation.length === 0) {
    res.status(404).send("Event not found!");
    return;
  }
  // for normal user, fetch all compensation he can receive
  const participationId: any[] = participation.map(p => p._id);
  const compensation: ICompensation[] = await Compensation.find({
    receiverId: { $in: participationId }
  });

  res.status(200).json(compensation);

  // for admin user, find all his participation
  const adminId: any[] = participation.map(p => p._id);
  // compensation the admin needs to send
  const adminCompensation: ICompensation[] = await Compensation.find({
    senderId: { $in: adminId }
  }).populate("participations");
  // base on the compensation, get all receiverIds, fetch their email from
  // participation, then fetch their email and corresponding id
  // const participantId: any[] = adminCompensation.map(c => c.receiverId);
  // const participants = await Participation.find({
  //   _id: { $in: participantId }
  // });

  // res.status(200).json(participants);
});

router.post("/compensation.json", secured(), async (req: any, res, next) => {
  const email = req.user.email; 
  
})

export default router;
