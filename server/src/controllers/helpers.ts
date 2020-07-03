import { Auth0User } from "types/auth0";
import { IEvent } from "api/Events";
import { Participation } from "api/Participations";

export async function isHost(user: Auth0User, event: IEvent) {
  const params = {
    event: event.id,
    email: user.email
  };
  const participations = await Participation.find(params);
  const ishost = participations.some(p => p.role === "host");
  return ishost;
}
