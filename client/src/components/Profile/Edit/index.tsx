import React, { Component } from "react";
import { observer } from "mobx-react";
import { IEventSettings } from "models/EventSettings";
import ProfileStore from "../storage/ProfileStore";
import EditForm from "./EditForm"

interface IState {
  profileStore: ProfileStore;
}

@observer
class Edit extends Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    const profileStore = new ProfileStore();
    this.state = {
      profileStore: profileStore,
    };
    profileStore.index();
  }

  render() {
    const { profileStore } = this.state;
    switch (profileStore.state.kind) {
      case "not_ready":
        return <div>Not ready</div>;
      case "ready":
        return <EditForm />;
    }
  }
}

export default Edit;
