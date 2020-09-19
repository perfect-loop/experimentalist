import { Request, Response, NextFunction } from "express";
import { Event, EventSchema, IEvent } from "models/Events";
import { isHost, getParticipantProfiles, randomizedName } from "./helpers";
import logger from "../shared/Logger";
import { Api } from "models/Socket";
import { io } from "../index";
import { IParticipation, Participation } from "models/Participations";
import { ParticipantUploadError } from "models/Errors";
import { Auth0User } from "types/auth0";
import BulkWriteError from "types/mongodb";
import { Compensation } from "models/Compensations";

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
    const socketRoomName = Api.Socket.eventSocketId(event);
    logger.info(`About to emit to ${socketRoomName} ${JSON.stringify(event)}`);
    io.to(socketRoomName).emit(Api.Socket.EVENT_UPDATED_NAME, { event });
    res.status(200).send("Complete");
  }

  public async admitParticipant(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const id = req.params.id;
    const participantId = req.params.participantId;
    const event = await Event.findById(id);
    const body = req.body as Api.Socket.IEventAdmitParticipant;
    logger.info(`[admitParticipant] ${JSON.stringify(body)}`);
    if (!event) {
      res.status(404).send("Not found");
      return;
    }

    const participant = (await Participation.findOne({
      _id: participantId,
      event
    })) as IParticipation;

    if (!participant) {
      res.status(403).send("Not authorized");
    }

    if (participant.admittedAt) {
      logger.info(
        `[admitParticipant] Participant ${participant._id} is allowed to skip waiting room`
      );
      io.emit(Api.Socket.EVENT_ADMIT_PARTICIPANT, body);
    } else {
      logger.info(
        `[admitParticipant] Participant ${participant._id} is NOT allowed to skip waiting room`
      );
    }
    res.status(200).send("Done");
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
      d.anonymousName = d.anonymousName ? d.anonymousName : randomizedName();
      return d;
    });
    logger.info(`will insert ${JSON.stringify(toInsert)}`);

    // Get all the inserted participation
    let participation: IParticipation[] = [];

    let insertErrors: ParticipantUploadError[] = [];
    try {
      participation = await Participation.insertMany(data, {
        ordered: false
      });
    } catch (e) {
      const error: BulkWriteError = e;
      participation = error.insertedDocs;
      logger.error(JSON.stringify(e));

      insertErrors = e.writeErrors;
    }

    logger.info(`Inserted ${JSON.stringify(participation)}`);

    // create compensation documents based on newly inserted participations
    const insertCompensations = participation.map((p: any) => ({
      amount: DEFAULT_COMPENSATION,
      receiver: p.id
    }));

    await Compensation.insertMany(insertCompensations);

    const allParticipantProfiles = await getParticipantProfiles(event);
    res.json({ participations: allParticipantProfiles, errors: insertErrors });
  }
}
