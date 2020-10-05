import { Auth0User } from "types/auth0";
import { IEvent } from "models/Events";
import {
  Participation,
  IParticipation,
  IParticipationProfile
} from "models/Participations";
import { IUserSchema, User } from "models/Users";
import { Profile } from "models/Profiles";
import logger from "../shared/Logger";
import { activeParticipants } from "../sockets";

export async function isHost(user: Auth0User, event: IEvent) {
  const params = {
    event: event.id,
    email: user.email
  };
  const participations = await Participation.find(params);
  const ishost = participations.some(
    p => p.role === "host" || p.role === "assistant"
  );
  return ishost;
}

export async function isParticipant(user: Auth0User, event: IEvent) {
  const params = {
    event: event.id,
    email: user.email
  };
  const participations = await Participation.find(params);
  return participations.length > 0;
}

export async function getParticipantProfiles(event: IEvent) {
  const allParticipants = (await Participation.find({
    event: event.id
  })) as IParticipation[];

  const emails = allParticipants.map((p: IParticipation) => p.email);

  const participantProfileMap: {
    [identifier: string]: IParticipationProfile;
  } = {};

  allParticipants.forEach((participant: IParticipation) => {
    const email: string = participant.email;
    participantProfileMap[email] = {} as IParticipationProfile;
    participantProfileMap[email].email = email;
    participantProfileMap[email].participant = participant;
  });

  const users = await User.find({
    email: { $in: emails }
  });

  const userIds = users.map((u: IUserSchema) => u._id);

  const profiles = await Profile.find({
    userId: { $in: userIds }
  }).populate("userId");

  profiles.forEach((p: any) => {
    const email = p.userId.email;
    p.userId = p.userId._id;
    participantProfileMap[email].profile = p;
  });

  const result: IParticipationProfile[] = Object.values(participantProfileMap);
  return result;
}

export const randomizedName = () =>
  Math.trunc(Math.random() * 1000000).toString();

export function setParticipantsAsParticipated(event: IEvent) {
  logger.info(
    `[setParticipantsAsParticipated] Updating participants for event ${event.id}`
  );
  return activeParticipants(event.id)
    .then(participations => {
      const ids: string[] = participations.map(p => p._id);
      logger.info(
        `[setParticipantsAsParticipated] ids are ${JSON.stringify(ids)}`
      );
      return ids;
    })
    .then(ids => {
      if (!ids || ids.length < 1) {
        return new Promise<number>((a, r) => {
          a(0);
        });
      }
      return Participation.updateMany(
        { _id: { $in: ids } },
        { participatedAt: new Date() }
      ).then(res => {
        logger.info(
          `[setParticipantsAsParticipated] Matched: ${res.n}; Updated: ${res.nModified}`
        );
        return new Promise<number>((a, r) => {
          a(res.nModified);
        });
      });
    });
}
