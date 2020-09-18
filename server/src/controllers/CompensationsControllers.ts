import { Request, Response, NextFunction } from "express";
import { IParticipation, Participation } from "models/Participations";
import { Profile, IProfile } from "models/Profiles";
import { User } from "models/Users";
import {
  ICompensation,
  Compensation,
  IUserCompensation
} from "models/Compensations";
import { ITransaction, Transaction } from "models/Transactions";
import { IEvent, Event } from "models/Events";
import { Auth0User } from "types/auth0";
import { VenmoApi } from "../venmoApi";
import { Venmo } from "models/Venmo";
import logger from "../shared/Logger";
import { AxiosError } from "axios";

export default class CompensationsController {
  public async userCompensation(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const user: Auth0User | undefined = req.user;
    const email: string = user?.email;
    if (user === undefined) return;

    const event = await this.getEvent(req.params.eventId);
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

    const eventId: any = req.params.eventId;
    if (eventId === null) {
      res.status(404).send("Event not found");
    }
    const adminParticipation = await this.getAdminParticipation(eventId, user);

    if (adminParticipation === null) {
      res
        .status(403)
        .send("Please make sure you are the host/assistant of the event");
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
      emailMap[email].anonymousName = compensation.receiver.anonymousName;
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
      req.params.eventId,
      user
    );

    if (!senderParticipation) {
      res.status(404).send("Participation not found");
      return;
    }

    const data = req.body;

    const emails: string[] = Object.keys(data);
    const eventId: any = req.params.eventId;

    const participation: IParticipation[] = await Participation.find({
      $or: [
        { $and: [{ email: { $in: emails } }, { event: eventId }] },
        { $and: [{ anonymousName: { $in: emails } }, { event: eventId }] }
      ]
    });

    const participationIds: string[] = participation.map(p => p._id);

    const compensation: ICompensation[] = await Compensation.find({
      receiver: { $in: participationIds }
    }).populate("receiver");

    compensation.forEach((c: any) => {
      const email = c.receiver.email;
      const anonymousName = c.receiver.anonymousName;
      const uploadedData = data[email] ? data[email] : data[anonymousName];
      c.amount = uploadedData.amount;
      c.receiver = c.receiver._id;
      c.sender = senderParticipation._id;
      c.currency = uploadedData.currency;
      c.save();
    });

    res.json(compensation);
  }

  public async pay(req: Request, res: Response, next: NextFunction) {
    const session = req.session;
    if (!session) {
      res.status(403).send("Unable to find venmo info");
      return;
    }

    const access_token = session.venmoAccessToken;
    if (access_token === undefined) {
      res
        .status(403)
        .send(
          "Your Venmo login has expired. Please use the button below to login."
        );
      return;
    }

    const venmoPaymentMethodId = session.venmoPaymentMethodId;
    if (venmoPaymentMethodId === undefined) {
      res.status(403).send("Invalid payment method");
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
    const { venmoId, amount, event, paymentMethod } = data;
    const title = (await Event.findById(event))?.title;
    const note = `Payment for ${title} from ${user.email}`;
    logger.info(`Going to pay to ${JSON.stringify(venmoId)}`);
    // choose default payment
    venmoApi
      .pay(access_token, venmoId, amount, "default", note, venmoPaymentMethodId)
      .then(async transaction => {
        const { id, date_completed } = transaction.payment;
        const newTransaction = new Transaction({
          transactionId: id,
          date: date_completed,
          method: "venmo",
          compensation: compensationId
        });
        const compensation = await Compensation.findById(compensationId);
        if (compensation === null) {
          res.status(422).send("Unable to update compensation");
          return;
        }
        compensation.status = "Paid";
        compensation.paymentMethod = paymentMethod;
        await compensation.save();
        await newTransaction.save();
        res.status(200).json(newTransaction);
      })
      .catch(({ error }) => {
        const errorMessage = error ? error.message : "Payment Error";
        res.status(404).send(errorMessage);
      });
  }

  private async getEvent(id: string) {
    const event = (await Event.findById(id)) as IEvent;
    return event;
  }

  private async getAdminParticipation(eventId: any, user: Auth0User) {
    return await Participation.findOne({
      $and: [
        { event: eventId },
        { email: user.email },
        {
          $or: [{ role: "host" }, { role: "assistant" }]
        }
      ]
    });
  }
}
