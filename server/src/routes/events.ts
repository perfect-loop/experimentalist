import express from "express";
import secured from "../lib/middleware/secured";
import { IEvent, Event } from "api/Events";
import { Participation, IParticipation } from "api/Participations";
import { Auth0User } from "types/auth0";
// @ts-ignore
import randomWords from "random-words";

const router = express.Router();

router.get("/events.json", secured(), async (req: any, res, next) => {
  const events = await Event.find();
  res.json(events);
});

router.get("/events/:id.json", secured(), async (req, res, next) => {
  const id = req.params.id;
  const event = await Event.findById(id);
  res.json(event);
});

router.get(
  "/events/:id/participants.json",
  secured(),
  async (req, res, next) => {
    const id = req.params.id;
    const event = (await Event.findById(id)) as IEvent;
    console.log(`event is ${event}`);
    const participants = (await Participation.find({
      "event._id": event._id
    })) as IParticipation[];
    res.json(participants);
  }
);

router.post(
  "/events/:id/participants.json",
  secured(),
  async (req, res, next) => {
    const id = req.params.id;
    const data = req.body as IParticipation[];
    const event = (await Event.findById(id)) as IEvent;
    const toInsert = data.map(d => {
      d.event = event;
      const name = randomWords({
        exactly: 1,
        wordsPerString: 2,
        separator: " "
      }).join("");
      console.log(name);
      d.anonymousName = name;
      return d;
    });
    console.log(`will insert ${JSON.stringify(toInsert)}`);
    await Participation.insertMany(data);
    console.log("Returning");
    const participants = (await Participation.find({
      "event._id": event._id
    })) as IParticipation[];
    res.json(participants);
  }
);

router.post("/events.json", secured(), (req: any, res: any, next) => {
  console.log("got request to create event");
  console.log(`body is ${JSON.stringify(req.body)}`);
  const body = req.body;

  console.log(`eventAttr is ${JSON.stringify(body)}`);
  const event = new Event(body) as IEvent;

  event
    .save()
    .then((newEvent: IEvent) => {
      console.log(`event is ${newEvent}`);
      const user: Auth0User = req.user;
      addParticipation(user.email, newEvent)
        .then(() => {
          res.json(newEvent);
        })
        .catch((reason: any) => {
          res.status(500).send(reason.message);
        });
    })
    .catch((reason: any) => {
      console.log(reason.constructor);
      res.status(500).send(reason.message);
    });
});

function addParticipation(
  email: string,
  event: IEvent
): Promise<IParticipation> {
  // TODO: find a way how to use types in the constructor
  const pNew = new Participation({ email, event, role: "host" });
  return pNew.save();
}

export default router;