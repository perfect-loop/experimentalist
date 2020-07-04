import { Request, Response, NextFunction } from "express";
import { IParticipation, Participation } from "api/Participations";
import { Profile, IProfile } from "api/Profiles";
import { User } from "api/Users";
import { ICompensation, Compensation } from "api/Compensations";
import { IEvent, Event } from "api/Events";
import { Auth0User } from "types/auth0";
import { Schema } from "mongoose";

export interface IUserCompensation {
  profile: IProfile;
  compensation: ICompensation;
  email: string;
}

export default class CompensationsController {
  public async userCompensation(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const user: Auth0User | undefined = req.user;
    const email: string = user?.email;
    if (user === undefined) return;

    const event = await this.getEvent(req.params.id);
    if (event === null) {
      res.status(404).send("Event not found");
    }

    const participation: IParticipation | null = await Participation.findOne({
      $and: [{ email: user.email }, { "event._id": event._id }]
    });

    if (participation === null) {
      res.status(404).send("Participation not found!");
      return;
    }
    // for normal user, fetch all compensation he can receive
    const receiverId: any = participation?._id;
    const compensation: ICompensation | null = await Compensation.findOne({
      receiverId
    });

    const profile = await Profile.findOne({ userId: user._id });

    if (profile === null || compensation === null || email === null) {
      res.status(404).send("Error! Compensation cannot be loaded");
      return;
    }
    const resObj: IUserCompensation = {
      profile,
      compensation,
      email
    };
    res.status(200).json([resObj]);

    //reset DB for testing
    // await Participation.deleteMany({ role: "attendee" });
    // await Compensation.deleteMany({});
    // res.status(200).send("deleted");
  }

  public async adminCompensation(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const user: Auth0User | undefined = req.user;
    if (!user) {
      res.status(403).send("Unauthorized");
      return;
    }

    const event = await this.getEvent(req.params.id);
    if (event === null) {
      res.status(404).send("Event not found");
    }

    const adminParticipation: IParticipation | null = await this.getAdminParticipation(
      event,
      user
    );

    if (adminParticipation === null) {
      res.status(404).send("Participation not found!");
      return;
    }

    const adminId: any = adminParticipation?._id;
    // all compensations the admin needs to send
    const adminCompensation: ICompensation[] = await Compensation.find({
      senderId: adminId
    }).populate("receiverId");

    // base on the compensation, get all receiverIds, fetch their email from
    // participation, then fetch their email and corresponding id
    // map email to corresponding total compensation
    const emailMap: { [identifier: string]: any } = {};
    const emails = adminCompensation.map((c: any) => c.receiverId.email);

    adminCompensation.forEach((compensation: any) => {
      const email: string = compensation.receiverId.email;
      emailMap[email] = {};
      compensation.receiverId = compensation.receiverId._id;
      emailMap[email].compensation = compensation;
    });

    const userId = (await User.find({ email: { $in: emails } })).map(
      u => u._id
    );
    const profiles = await Profile.find({
      userId: { $in: userId }
    }).populate("userId");
    profiles.forEach((p: any) => {
      const email = p.userId.email;
      p.userId = p.userId._id;
      emailMap[email].profile = p;
      emailMap[email].email = email;
    });

    const result: IUserCompensation[] = Object.values(emailMap);
    res.status(200).json(result);
  }

  public async createCompensation(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    // req.body => {email: amount}
    const event: IEvent = await this.getEvent(req.params.id);
    const user: Auth0User | undefined = req.user;
    if (!user) {
      res.status(403).send("Unauthorized");
      return;
    }
    const senderParticipation = await this.getAdminParticipation(event, user);

    if (!senderParticipation) {
      res.status(404).send("Participation not found");
      return;
    }

    const data = req.body;
    const emails: string[] = Object.keys(data);

    const participation: IParticipation[] = await Participation.find({
      $and: [{ email: { $in: emails } }, { "event._id": event._id }]
    });

    const participationIds: any[] = participation.map(p => p._id);
    const compensation: ICompensation[] = await Compensation.find({
      receiverId: { $in: participationIds }
    }).populate("receiverId", "email");
    
    compensation.forEach((c: any) => {
      const email = c.receiverId.email;
      c.amount = data[email];
      c.receiverId = c.receiverId._id;
      c.senderId = senderParticipation._id;
      c.save();
    });

    res.json(compensation);
  }

  private async getEvent(id: string) {
    const event = (await Event.findById(id)) as IEvent;
    return event;
  }

  private async getAdminParticipation(event: IEvent, user: Auth0User) {
    return await Participation.findOne(
          {
            $and: [{ "event._id": event._id }, { email: user.email }]
          }
        );
      }
}
