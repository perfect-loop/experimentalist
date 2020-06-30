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
