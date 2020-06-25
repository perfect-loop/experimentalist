import React, { Component } from "react";
import { observer } from "mobx-react";
import ProfileStore from "../storage/ProfileStore";
import ShowProfile from "../Show/ShowView";
import NewProfile from "../New/NewProfile";
import { Redirect } from "react-router-dom";

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
    switch (this.state.profileStore.state.kind) {
      case "empty":
        return (
          <>
            <Redirect to="/profile/new" />
          </>
        );
      case "not_ready":
        return (
          <>
            <div>Loading</div>
          </>
        );
      case "ready":
        return (
          <>
            <ShowProfile profileStore={this.state.profileStore} />
          </>
        );
    }
  }
}

export default Index;
