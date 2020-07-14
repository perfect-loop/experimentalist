import { Request, Response, NextFunction } from "express";
import { IParticipation, Participation } from "api/Participations";
import { Profile, IProfile } from "api/Profiles";
import { User } from "api/Users";
import {
  ICompensation,
  Compensation,
  IUserCompensation
} from "api/Compensations";
import { ITransaction, Transaction } from "api/Transactions";
import { IEvent, Event } from "api/Events";
import { Auth0User } from "types/auth0";
import { VenmoApi, IVenmoUser } from "../venmoApi";

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
      $and: [{ email: user.email }, { event: event.id }]
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

    const transactions: ITransaction[] = await Transaction.find({
      compensation: compensation?.id
    });

    const profile = await Profile.findOne({ userId: user._id });

    if (profile === null || compensation === null || email === null) {
      res.status(404).send("Error! Compensation cannot be found");
      return;
    }
    const resObj: IUserCompensation = {
      profile,
      compensation,
      email,
      transactions
    };
    res.status(200).json([resObj]);
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
    const adminParticipation = await this.getAdminParticipation(eventId, user);

    if (adminParticipation === null) {
      res
        .status(403)
        .send(
          "Participation not found! Please make sure you are the host of the event"
        );
      return;
    }
    // find all compensations of the specific event
    const allParticipations: IParticipation[] = await Participation.find({
      $and: [{ event: eventId }, { role: "attendee" }]
    });

    if (allParticipations.length === 0) {
      res.status(404).send("This event does not have any participants");
      return;
    }

    const emailMap: {
      [identifier: string]: IUserCompensation;
    } = {};

    const emails = allParticipations.map((p: IParticipation) => p.email);
    const ids = allParticipations.map((p: IParticipation) => p.id);
    const compensations = await Compensation.find({
      receiver: { $in: ids }
    }).populate("receiver");

    const compensationIds = compensations.map(c => c.id);
    const transactions = await Transaction.find({
      compensation: { $in: compensationIds }
    });

    const transactionMap: { [i: string]: ITransaction[] } = {};
    transactions.forEach(t => {
      if (!(t.compensation in transactionMap)) {
        transactionMap[t.compensation] = [];
      }
      transactionMap[t.compensation].push(t);
    });

    compensations.forEach((compensation: any) => {
      const email: string = compensation.receiver.email;
      emailMap[email] = {} as IUserCompensation;
      emailMap[email].email = email;
      emailMap[email].compensation = compensation;
      emailMap[email].transactions = transactionMap[compensation.id] || [];
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
    const user: Auth0User | undefined = req.user;
    if (!user) {
      res.status(403).send("Unauthorized");
      return;
    }
    const senderParticipation = await this.getAdminParticipation(
      req.params.id,
      user
    );

    if (!senderParticipation) {
      res.status(404).send("Participation not found");
      return;
    }

    const data = req.body;
    const emails: string[] = Object.keys(data);
    const eventId: any = req.params.id;

    const participation: IParticipation[] = await Participation.find({
      $and: [{ email: { $in: emails } }, { event: eventId }]
    });

    const participationIds: string[] = participation.map(p => p._id);
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

  public async pay(req: Request, res: Response, next: NextFunction) {
    const access_token = process.env.VENMO_ACCESS_TOKEN;
    if (access_token === undefined) {
      res.status(403).send("Invalid Venmo access token ");
      return;
    }

    const venmoApi = new VenmoApi();
    const user: Auth0User | undefined = req.user;

    if (!user) {
      res.status(403).send("Unauthorized");
      return;
    }

    const compensationId = req.params.id;
    const data = req.body;
    const { venmoId, amount, event } = data;
    const venmoUsers: IVenmoUser[] = await venmoApi.userSearch(
      venmoId,
      access_token
    );
    if (venmoUsers.length === 0) {
      res.json(404).send("Venmo User not found!");
      return;
    }
    const title = (await Event.findById(event))?.title;
    const note = `Payment for ${title} from ${user.email}`;
    //Getting the first query result
    const venmoUser = venmoUsers[0];
    // choose default payment
    venmoApi
      .pay(access_token, venmoUser.id, amount, "default", note)
      .then(transaction => {
        const { id, date_completed } = transaction.payment;
        const newTransaction = new Transaction({
          transactionId: id,
          date: date_completed,
          method: "venmo",
          compensation: compensationId
        });
        newTransaction.save();
        res.status(200).json(newTransaction);
      })
      .catch(error => {
        console.log(error.data);
        res.status(404).json(error.data);
      });
  }

  private async getEvent(id: string) {
    const event = (await Event.findById(id)) as IEvent;
    return event;
  }

  private async getAdminParticipation(eventId: any, user: Auth0User) {
    return await Participation.findOne({
      $and: [{ event: eventId }, { email: user.email }, { role: "host" }]
    });
  }
}
