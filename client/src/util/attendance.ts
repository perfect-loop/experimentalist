import { IParticipation } from "api/Participations";
import { Api } from "./api";
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
 */
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
export function isLateToMeeting(participant: IParticipation): boolean {
  if (participant.event.state !== "not_started" && !participant.attendedAt) {
    return true;
  }

  return false;
}
