import express from "express";
import secured from "../lib/middleware/secured";
import { IEvent, Event } from "api/Events";
import { Participation } from "api/Participations";
import { Auth0User } from "types/auth0";

const router = express.Router();

router.get("/participants.json", secured(), async (req: any, res, next) => {
  const id = req.query.eventId;
  const event = (await Event.findById(id)) as IEvent;
  const user: Auth0User = req.user;
  const params = {
    "event._id": event!!._id,
    email: user.email,

  }
  console.log(params);
  const participation = await Participation.find(params)
  console.log(`participation is ${JSON.stringify(participation)}`)
  if (participation.length === 0) {
    res.status(404).send("Event not found for the user");
    return;
  }
  res.json(participation);
});

export default router;