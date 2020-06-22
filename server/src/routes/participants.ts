import express from "express";
import secured from "../lib/middleware/secured";
import { IEvent, Event } from "api/Events";
import { Participation } from "api/Participations";
import { Auth0User } from "types/auth0";

const router = express.Router();

router.get("/my/participants.json", secured(), async (req: any, res, next) => {
  const eventId = req.query.eventId;
  const user: Auth0User = req.user;

  console.log(`Event id is ${eventId}`);

  const participations = eventId
    ? await participationsWithEvent(eventId, user)
    : await participationsWithoutEvent(user);

  res.json(participations);
});

async function participationsWithEvent(eventId: string, user: any) {
  const event = (await Event.findById(eventId)) as IEvent;
  if (!event) {
    return [];
  }
  const params = {
    "event._id": event._id,
    email: user.email
  };
  console.log(params);
  const participations = await Participation.find(params).sort(
    "-event.startAt"
  );
  console.log(`participation is ${JSON.stringify(participations)}`);
  return participations;
}

async function participationsWithoutEvent(user: any) {
  const params = {
    email: user.email
  };
  console.log(params);
  const participations = await Participation.find(params).sort(
    "-event.startAt"
  );
  console.log(`participation is ${JSON.stringify(participations)}`);
  return participations;
}

export default router;
