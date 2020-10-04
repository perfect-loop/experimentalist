import { IParticipation } from "models/Participations";
import { IEventSettings } from "models/EventSettings";

export const canShowSpeedDial = (participant: IParticipation, eventSettings: IEventSettings) => {
  if (participant.role === "host") {
    return true;
  }

  return eventSettings ? eventSettings.showInstructions : true;
};
