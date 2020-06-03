import express, { Application } from "express";
import secured from "../lib/middleware/secured";
import { IncomingMessage } from "http";
import { IEvent, Event } from "api/Events";

const router = express.Router();

router.get("/events.json", secured(), (req, res, next) => {
  Event.find().then((events: any) => {
    res.json(events);
  });
});

// router.post("/events.json", secured(), (req, res, next) => {
router.post("/events.json", (req: any, res: any, next) => {
  console.log("got request to create event");
  console.log(`body is ${JSON.stringify(req.body)}`);
  const body = req.body;

  console.log(`eventAttr is ${JSON.stringify(body)}`);
  const event = new Event(body) as IEvent;

  event
    .save()
    .then((newEvent: IEvent) => {
      console.log(`event is ${newEvent}`);
      res.json(newEvent);
    })
    .catch((reason: any) => {
      console.log(reason.constructor);
      res.status(500).send(reason.message);
    });
});

export default router;
