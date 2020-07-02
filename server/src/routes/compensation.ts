import express from "express";
import secured from "../lib/middleware/secured";
import { ICompensation, Compensation } from "api/Compensations";
import { IParticipation, Participation } from "api/Participations";
import { IUserSchema, User } from "api/Users";
import { Auth0User } from "types/auth0";
import { Schema } from "mongoose";
import { Profile, IProfile } from "api/Profiles";

const router = express.Router();

interface IUserCompensation {
  profile: IProfile,
  compensation: number,
}

router.get("/compensation.json", secured(), async (req: any, res, next) => {
  // return a hashMap, email maps to profile & compensation
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
  // sum compensation
  const totalCompensation = compensation.reduce( (acc, c) => {
    return acc + c.amount
  }, 0)

  const normalUser = await User.findOne({ email });
  if (normalUser === null) {
    res.status(404).send("Profile not found")
    return
  }
  const profile = (await Profile.find({ userId: normalUser._id}))[0]
  const userObj: { [Identifier: string]: IUserCompensation } = {};
  userObj[email] = {
    profile,
    compensation: totalCompensation
  }
  res.status(200).json(userObj);

  // for admin user, find all his participation
  const adminId: any[] = participation.map(p => p._id);
  // compensation the admin needs to send
  const adminCompensation: ICompensation[] = await Compensation.find({
    senderId: { $in: adminId }
  }).populate("receiverId");
  // base on the compensation, get all receiverIds, fetch their email from
  // participation, then fetch their email and corresponding id
  // map email to corresponding total compensation
  const emailMap: any = {};

  adminCompensation.forEach((compensation: any) => {
    const email: string = compensation.receiverId.email;
    if (!(email in emailMap)) emailMap[email] = { compensation: 0 };
    emailMap[email].compensation += compensation.amount;
  });

  const emails = Object.keys(emailMap);
  const userId = (await User.find({ email: { $in: emails } })).map(u => u._id);
  const profiles = await Profile.find({ userId: { $in: userId } }).populate(
    "userId"
  );
  profiles.forEach((p: any) => {
    const email = p.userId.email;
    p.userId = p.userId._id;
    emailMap[email].profile = p;
  });

  res.status(200).json(emailMap);
});

router.post("/compensation.json", secured(), async (req: any, res, next) => {
  const email = req.user.email;
  res.json(email);
});

export default router;
