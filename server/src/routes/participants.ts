import express from "express";
import secured from "../lib/middleware/secured";
import { IEvent, Event } from "models/Events";
import { Participation, IParticipation } from "models/Participations";
import { Auth0User } from "types/auth0";
import ParticipantsController from "../controllers/ParticipantsController";
import logger from "../shared/Logger";

const router = express.Router();

router.patch(
  "/my/participants/:id.json",
  secured(),
  async (req: any, res, next) => {
    new ParticipantsController().patch(req, res, next);
  }
);

router.get("/my/participants.json", secured(), async (req: any, res, next) => {
  const eventId = req.query.eventId;
  const user: Auth0User = req.user;

  logger.info(`Event id is ${eventId}`);

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
    event: event.id,
    email: user.email
  };
  const participations = await Participation.find(params).populate("event");
  return participations;
}

async function participationsWithoutEvent(user: any) {
  const params = {
    email: user.email
  };
  console.log(params);
  const participations = await Participation.find(params).populate({
    path: "event"
  });
  // https://github.com/Automattic/mongoose/issues/2202
  return participations.sort((lhs: IParticipation, rhs: IParticipation) => {
    return rhs.event.createdAt.getTime() - lhs.event.createdAt.getTime();
  });
}

export default router;
