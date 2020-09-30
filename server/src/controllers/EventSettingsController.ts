import { Request, Response, NextFunction } from "express";
import { Event } from "models/Events";
import { IEventSettings, EventSettings } from "models/EventSettings";
import { isHost, isParticipant } from "./helpers";
import { Api } from "models/Socket";
import logger from "../shared/Logger";

export default class EventSettingsController {
  public async index(req: Request, res: Response, next: NextFunction) {
    const eventId = req.params.eventId;
    const user = req.user;
    const event = await Event.findById(eventId);
    if (!event) {
      res.status(404).send("Not found");
      return;
    }

    if (!user) {
      res.status(403).send("Unauthorized");
      return;
    }

    if (!(await isParticipant(user, event))) {
      res.status(403).send("Unauthorized");
      return;
    }

    const params = {
      event: event.id
    };
    const eventSettings = await EventSettings.find(params).populate("event");
    res.json(eventSettings);
  }

  public async post(req: Request, res: Response, next: NextFunction) {
    const eventId = req.params.eventId;
    const user = req.user;
    const event = await Event.findById(eventId);
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

    const body = req.body;

    console.log(`eventAttr is ${JSON.stringify(body)}`);
    const eventSettings = new EventSettings(body) as IEventSettings;
    eventSettings.event = event;
    await eventSettings.save();
    res.json(eventSettings);
  }

  public async put(req: Request, res: Response, next: NextFunction) {
    const eventId = req.params.eventId;
    const eventSettingsId = req.params.id;
    const user = req.user;
    const event = await Event.findById(eventId);

    if (!user) {
      res.status(403).send("Unauthorized");
      return;
    }

    if (!event) {
      res.status(404).send("Not found");
      return;
    }

    if (!(await isHost(user, event))) {
      res.status(403).send("Unauthorized Host");
      return;
    }

    const eventSettings = await EventSettings.findById(eventSettingsId);

    if (!eventSettings) {
      res.status(404).send("Event Settings not found");
      return;
    }

    const body = req.body;

    logger.info("Updating with ", body);

    eventSettings.requireId = body.requireId;
    eventSettings.introVideo = body.introVideo;
    eventSettings.paymentMethod = body.paymentMethod?.toLowerCase();

    eventSettings
      .save()
      .then((settings: IEventSettings) => {
        // TODO: in order to make this compatible with current
        // React store, this needs to return an array.
        // To fix this, we need to separate "index" state from "get" state in the store
        res.json([settings]);
      })
      .catch((reason: any) => {
        const error: Api.Error = {
          message: reason.message
        };
        res.status(500).send(error);
      });
  }
}
