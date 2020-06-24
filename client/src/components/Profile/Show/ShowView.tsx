import React from "react";
import ProfileStore from "../storage/ProfileStore";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
// import { ZOOM_MEETING_ID, ZOOM_PERSINAL_MEETING_PASSWORD, ZOOM_SUBDOMAIN } from "../../VideoConference/ConferenceView";
// import Button from "@material-ui/core/Button";

interface IProps {
  profileStore: ProfileStore;
}

function ShowProfile(props: IProps) {
  switch (props.profileStore.state.kind) {
    case "not_ready":
      return <div>Not ready</div>;
    case "ready":
      const profile = props.profileStore.state.model;
      return (
        <>
          <h1>{profile.firstName}</h1>
          <div>{profile.lastName}</div>
        </>
      );
  }
}

export default observer(ShowProfile);
