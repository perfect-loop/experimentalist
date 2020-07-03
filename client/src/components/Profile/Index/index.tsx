import React, { Component } from "react";
import { observer } from "mobx-react";
import ProfileStore from "../storage/ProfileStore";
import ProfileIndex from "./ProfileIndex";

interface IState {
  profileStore: ProfileStore;
}

@observer
class Index extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    const profileStore = new ProfileStore();
    this.state = {
      profileStore,
    };
    profileStore.get();
  }

  public render() {
    return <ProfileIndex profileStore={this.state.profileStore} />;
  }
}

export default Index;
