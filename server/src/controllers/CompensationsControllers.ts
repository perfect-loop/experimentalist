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
    const receiver: any = participation?._id;
    const compensation: ICompensation | null = await Compensation.findOne({
      receiver
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

      const eventId: any = req.params.id;
      if (eventId === null) {
        res.status(404).send("Event not found");
      }

      // find all compensations of the specific event
      const allParticipations: IParticipation[] = await Participation.find({
        $and: [{event: eventId}, {role: "attendee"}]
      });

      if (allParticipations.length === 0) {
        res.status(404).send("Participation not found!");
        return;
      }

      const emailMap: { [identifier: string]: IUserCompensation } = {};

      const emails = allParticipations.map((p: IParticipation) => p.email);
      const ids = allParticipations.map((p: IParticipation) => p.id);
      const compensations = await Compensation.find({
        receiver: {$in: ids}
      }).populate("receiver");
      
      console.log(emails);
      compensations.forEach((compensation: any) => {
        const email: string = compensation.receiver.email;
        emailMap[email] = {} as IUserCompensation;
        emailMap[email].email = email;
        compensation.receiver = compensation.receiver._id;
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
      receiver: { $in: participationIds }
    }).populate("receiver", "email");

    compensation.forEach((c: any) => {
      const email = c.receiver.email;
      c.amount = data[email];
      c.receiver = c.receiver._id;
      c.sender = senderParticipation._id;
      c.save();
    });

    res.json(compensation);
  }

  private async getEvent(id: string) {
    const event = (await Event.findById(id)) as IEvent;
    return event;
  }

  private async getAdminParticipation(event: IEvent, user: Auth0User) {
    return await Participation.findOne({
      $and: [{ "event": event.id }, { email: user.email }]
    });
  }


}
