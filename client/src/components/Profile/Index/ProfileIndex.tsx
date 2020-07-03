import React, { Component } from "react";
import { observer } from "mobx-react";
import ProfileStore from "../storage/ProfileStore";
import ShowProfile from "../Show/ShowView";
import { Redirect } from "react-router-dom";

interface IProps {
  profileStore: ProfileStore;
}

@observer
class ProfileIndex extends Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  public render() {
    switch (this.props.profileStore.state.kind) {
      case "empty":
        return <Redirect to="/profile/new" />;
      case "not_ready":
        return <div>Loading</div>;
      case "ready":
        return <ShowProfile profileStore={this.props.profileStore} />;
    }
  }
}

export default ProfileIndex;
