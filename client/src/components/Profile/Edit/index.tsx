import React, { Component } from "react";
import { observer } from "mobx-react";
import ProfileStore from "../storage/ProfileStore";
import { IProfile } from "models/Profiles";
import ProfileForm from "../ProfileForm";
import { Api } from "models/Socket";
import { ProfileType } from "models/decoders/ProfileType";

@observer
export default class Edit extends Component {
  profileStore: ProfileStore = new ProfileStore();
  constructor(props: {}) {
    super(props);
    this.profileStore.index();
  }

  public render() {
    switch (this.profileStore.state.kind) {
      case "empty":
      case "not_ready":
        return <div>Loading</div>;
      case "ready":
        const model = this.profileStore.state.data[0];
        return <ProfileForm onSubmit={this.onSubmit} afterSuccessPath={"/events"} model={model} />;
    }
  }

  private onSubmit = (values: any): Promise<IProfile> => {
    const newProfile = values as IProfile;
    const url = `${this.profileStore.urlPrefix()}.json`;

    return new Promise((resolve, reject) => {
      this.profileStore
        .put(url, newProfile, ProfileType)
        .then((profile: IProfile) => {
          resolve(profile);
        })
        .catch((error: Api.Error) => {
          reject(error);
        });
    });
  };
}
