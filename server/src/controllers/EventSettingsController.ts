import { Request, Response, NextFunction } from "express";
import { Event } from "api/Events";
import { IEventSettings, EventSettings } from "api/EventSettings";
import { isHost, isParticipant } from "./helpers";

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
    const eventSettings = await EventSettings.findOne(params).populate("event");
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
}
