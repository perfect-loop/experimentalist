import { Request, Response, NextFunction } from "express";
import { Event, EventSchema } from "api/Events";
import { isHost } from "./helpers";
import logger from "../shared/Logger";
import { Api } from "api/Socket";
import { io } from "../index";

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
}
