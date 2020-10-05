import { IParticipation } from "models/Participations";
import { IEventSettings } from "models/EventSettings";

export const canShowSpeedDial = (participant: IParticipation, eventSettings: IEventSettings): boolean => {
  if (participant.role === "attendee") {
    return eventSettings ? eventSettings.showInstructions : true;
  }

  return true;
};
