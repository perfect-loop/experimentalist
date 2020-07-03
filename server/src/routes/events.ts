import express from "express";
import secured from "../lib/middleware/secured";
import { IEvent, Event } from "api/Events";
import { Participation, IParticipation } from "api/Participations";
import { Auth0User } from "types/auth0";
// @ts-ignore
import randomWords from "random-words";
import EventsController from "../controllers/EventsController";

const router = express.Router();

router.get("/events.json", secured(), async (req: any, res, next) => {
  const email = req.user.email;
  const participantEvents = await Participation.find({ email })
    .populate("events")
    .then(participations => {
      return participations.map(p => p.event);
    });
  res.json(participantEvents);
});

router.get("/events/:id.json", secured(), async (req: any, res, next) => {
  const id = req.params.id;
  const user = req.user;
  const event = await Event.findById(id);
  if (!event) {
    res.status(404).send("Not found");
    return;
  }
  if (!(await isHost(user, event))) {
    res.status(403).send("Unauthorized");
    return;
  }
  res.json(event);
});

router.put("/events/:id/lock.json", secured(), async (req: any, res, next) => {
  new EventsController().lock(req, res, next);
});

router.put(
  "/events/:id/activate.json",
  secured(),
  async (req: any, res, next) => {
    new EventsController().activate(req, res, next);
  }
);

router.get(
  "/events/:id/participants.json",
  secured(),
  async (req: any, res, next) => {
    const id = req.params.id;
    const event = (await Event.findById(id)) as IEvent;
    console.log(`event is ${event}`);

    const user = req.user;
    if (!(await isHost(user, event))) {
      res.status(403).send("Unauthorized");
      return;
    } else {
      const participants = (await Participation.find({
        event: event.id
      })) as IParticipation[];
      res.json(participants);
    }
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
      event: event.id
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
          console.log(`Unable to create participation ${reason}`);
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
  const params = {
    email,
    event: event.id,
    role: "host"
  };
  console.log(`Creating host participant ${JSON.stringify(params)}`);
  const pNew = new Participation(params);
  return pNew.save();
}

async function isHost(user: Auth0User, event: IEvent) {
  const params = {
    event: event.id,
    email: user.email
  };
  const participations = await Participation.find(params);
  const ishost = participations.some(p => p.role === "host");
  return ishost;
}

export default router;
