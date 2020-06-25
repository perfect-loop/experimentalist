import React, { Component } from "react";
import { observer } from "mobx-react";
import ProfileStore from "../storage/ProfileStore";
import ShowProfile from "../Show/ShowView";
import NewProfile from "../New/NewProfile";
import { Redirect } from "react-router-dom";

interface IProps {
  updateUrl(url: string): void;
}
interface IState {
  profileStore: ProfileStore;
}

@observer
class Index extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    const profileStore = new ProfileStore();
    this.state = {
      profileStore,
    };
    profileStore.get();
  }

  public render() {
    switch (this.state.profileStore.state.kind) {
      case "ready":
        return (
          <>
            <ShowProfile profileStore={this.state.profileStore} />
          </>
        );
      case "not_ready":
        return (
          <>
            <Redirect to="/profile/new" />
          </>
        );
    }
  }
}

export default Index;
