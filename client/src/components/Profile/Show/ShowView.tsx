import React from "react";
import ProfileStore from "../storage/ProfileStore";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

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
          <div>{profile.firstName}</div>
          <div>{profile.lastName}</div>
        </>
      );
  }
}

export default observer(ShowProfile);
