import express from "express";
import secured from "../lib/middleware/secured";
import { IEvent, Event } from "models/Events";
import { Participation, IParticipation } from "models/Participations";
import { Auth0User } from "types/auth0";
import EventsController from "../controllers/EventsController";
import { getParticipantProfiles, isHost } from "../controllers/helpers";

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
      const allParticipantProfiles = await getParticipantProfiles(event);
      res.json(allParticipantProfiles);
    }
  }
);

router.post(
  "/events/:id/participants.json",
  secured(),
  async (req, res, next) => {
    new EventsController().uploadParticipants(req, res, next);
  }
);

router.post(
  "/events/:id/participants/:participantId/admit.json",
  secured(),
  async (req, res, next) => {
    new EventsController().admitParticipant(req, res, next);
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

export default router;
