import { Request, Response, NextFunction } from "express";
import { Event, EventSchema, IEvent } from "api/Events";
import { isHost } from "./helpers";
import logger from "../shared/Logger";
import { Api } from "api/Socket";
import { io } from "../index";
import { IParticipation, Participation } from "api/Participations";
import { Auth0User } from "types/auth0";
import BulkWriteError from "types/mongodb";
import { Compensation } from "api/Compensations";

export default class EventsController {
  public async activate(req: Request, res: Response, next: NextFunction) {
    logger.info("Get put event");
    const id = req.params.id;
    const user = req.user;
    const event = await Event.findById(id);
    if (!event) {
      res.status(404).send("Not found");
      return;
    }

    if (!user) {
      res.status(403).send("Unauthorized");
      return;
    }

    if (!(await isHost(user, event))) {
      res.status(403).send("Unauthorized");
      return;
    }

    event.state = "active";
    await event.save();
    logger.info("About to emit ", event);
    io.emit(Api.Socket.EVENT_UPDATED_NAME, { event });
    res.status(200).send("Complete");
  }

  public async lock(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const user = req.user;
    const event = await Event.findById(id);
    if (!event) {
      res.status(404).send("Not found");
      return;
    }

    if (!user) {
      res.status(403).send("Unauthorized");
      return;
    }
    if (!(await isHost(user, event))) {
      logger.info("Non-host is attempting to lock event");
      res.status(403).send("Unauthorized");
      return;
    }

    event.state = "locked";
    await event.save();
    logger.info("Event state set to ", event.state);

    res.status(200).send("Complete");
  }

  public async uploadParticipants(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const id = req.params.id;
    const data = req.body as IParticipation[];

    const event = (await Event.findOne({ _id: id })) as IEvent;

    const user: Auth0User | undefined = req.user;

    if (!user) {
      res.status(403).send("Unauthorized");
      return;
    }

    if (!event) {
      res.status(404).send("Event not found");
      return;
    }

    const hostParticipation: IParticipation | null = await Participation.findOne(
      { $and: [{ email: user.email }, { event: event.id }] }
    );

    if (hostParticipation === null) {
      res.status(404).send("Participation not found!");
      return;
    }

    const DEFAULT_COMPENSATION = 0;

    const toInsert = data.map(d => {
      d.event = event;
      d.anonymousName = Math.trunc(Math.random() * 1000000).toString();
      return d;
    });
    logger.info(`will insert ${JSON.stringify(toInsert)}`);

    // Get all the inserted participation
    let participation: IParticipation[] = [];
    try {
      participation = await Participation.insertMany(data, {
        ordered: false
      });
    } catch (e) {
      const error: BulkWriteError = e;
      participation = error.insertedDocs;
      logger.error(JSON.stringify(e));
    }

    logger.info(`Inserted ${JSON.stringify(participation)}`);

    // create compensation documents based on newly inserted participations
    const insertCompensations = participation.map((p: any) => ({
      amount: DEFAULT_COMPENSATION,
      receiver: p.id
    }));

    await Compensation.insertMany(insertCompensations);

    const allParticipants = (await Participation.find({
      event: event.id
    })) as IParticipation[];

    res.json(allParticipants);
  }
}
