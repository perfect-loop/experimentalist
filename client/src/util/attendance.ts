import { IParticipation } from "models/Participations";
import { IEventSettings } from "models/EventSettings";
import { Api } from "./api";
import { Api as API } from "models/Socket";
import { AxiosResponse, AxiosError } from "axios";

export function registerAttendance(participant: IParticipation): Promise<IParticipation> {
  const client = new Api({});
  const url = `/api/attendance/participants/${participant._id}/activate`;
  return new Promise((resolve, reject) => {
    client
      .put<IParticipation, null>(url)
      .then((response: AxiosResponse<IParticipation>) => {
        const updatedParticipant = response.data;
        resolve(updatedParticipant);
      })
      .catch((error: AxiosError) => {
        console.error(error.response?.statusText);
        reject(participant);
      });
  });
}

/**
 * Send a request to admit participant
 *
 * @param participant
 * @param zoomUserId
 */

export function requestAdmit(participant: IParticipation, zoomUserId: number) {
  const client = new Api({});
  const body: API.Socket.IEventAdmitParticipant = {
    userId: zoomUserId,
  };
  const url = `/api/events/${participant.event._id}/participants/${participant._id}/admit.json`;
  return new Promise((resolve, reject) => {
    client
      .post<IParticipation, API.Socket.IEventAdmitParticipant>(url, body)
      .then((response: AxiosResponse<IParticipation>) => {
        const updatedParticipant = response.data;
        resolve(updatedParticipant);
      })
      .catch((error: AxiosError) => {
        console.error(error.response?.statusText);
        reject(participant);
      });
  });
}

export function registerAdmitance(participant: IParticipation): Promise<IParticipation> {
  const client = new Api({});
  const url = `/api/attendance/participants/${participant._id}/admit`;
  return new Promise((resolve, reject) => {
    client
      .put<IParticipation, null>(url)
      .then((response: AxiosResponse<IParticipation>) => {
        const updatedParticipant = response.data;
        resolve(updatedParticipant);
      })
      .catch((error: AxiosError) => {
        console.error(error.response?.statusText);
        reject(participant);
      });
  });
}
/**
 * Determines if the user is too late to attend the meeting
 *
 * @param participant
 */
export function isLateToMeeting(participant: IParticipation, eventSettings: IEventSettings): boolean {
  if (participant.event.state !== "not_started" && !participant.attendedAt) {
    return true;
  }

  if (
    eventSettings?.intelligentReadmit &&
    participant.event.state === "locked" &&
    participant.status === "not_participated"
  ) {
    return true;
  }

  if (participant.event.state === "locked" && !participant.admittedAt) {
    return true;
  }

  return false;
}
