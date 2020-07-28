import { observable, action } from "mobx";
import { AxiosResponse, AxiosError } from "axios";
import { IParticipation } from "api/Participations";
import { Api } from "../../../util/api";

interface IStateNotStarted {
  kind: "not_started";
}

interface IStateUploading {
  kind: "uploading";
  verificationImageUrl?: string;
}

interface IStateSuccessUpload {
  kind: "success_upload";
  verificationImageUrl: string;
}

interface IStateFinished {
  kind: "finish";
  verificationImageUrl: string;
}

type IState = IStateNotStarted | IStateUploading | IStateFinished | IStateSuccessUpload;

export default class ImageUploadStore {
  @observable state: IState;
  private participationId: string;

  constructor(participationId: string) {
    this.state = {
      kind: "not_started",
    };
    this.participationId = participationId;
  }

  @action
  public complete = (): boolean => {
    console.log("[complete]", this.state.kind);
    switch (this.state.kind) {
      case "uploading":
      case "not_started": {
        return false;
      }
      case "finish":
      case "success_upload": {
        this.state = {
          kind: "finish",
          verificationImageUrl: this.state.verificationImageUrl,
        };
        return true;
      }
    }
  };

  @action
  public update = (verificationImageUrl: string) => {
    const client = new Api({});
    const body = {
      verificationImageUrl,
    };
    const url = `/api/my/participants/${this.participationId}.json`;
    this.state = {
      kind: "uploading",
    };
    client
      .patch<IParticipation, any>(url, body)
      .then((response: AxiosResponse<IParticipation>) => {
        const { data } = response;
        if (data.verificationImageUrl) {
          this.state = {
            kind: "success_upload",
            verificationImageUrl: data.verificationImageUrl,
          };
        }
        console.log("ImageUpload finished");
      })
      .catch((error: AxiosError) => {
        console.error(error.response?.statusText);
      });
  };
}
