import { Component } from "react";
import React from "react";
import Edit from "../../Profile/Edit";
import { Typography } from "@material-ui/core";
import ProfileStore from "../../Profile/storage/ProfileStore";
import { observer } from "mobx-react";
import { IProfile } from "models/Profiles";
import { Redirect } from "react-router-dom";

interface IProps {
  eventId: string;
  profileStore?: ProfileStore;
}

const nextUrl = (eventId: string): string => {
  return `/events/${eventId}/conference`;
};

@observer
export default class PaymentMethod extends Component<IProps, {}> {
  private profileStore = this.props.profileStore || new ProfileStore();
  constructor(props: IProps) {
    super(props);
    this.profileStore.index();
  }
  public render(): JSX.Element {
    switch (this.profileStore.state.kind) {
      case "not_ready":
      case "empty":
        return <div>Loading</div>;
      case "ready":
        const model = this.profileStore.state.data[0] as IProfile;
        if (model && model.venmoId) {
          return <Redirect to={nextUrl(this.props.eventId)} />;
        } else {
          return (
            <>
              <Typography variant="h6">Please update your profile</Typography>
              <Edit
                requireVenmo={true}
                profileStore={this.profileStore}
                afterSuccessPath={nextUrl(this.props.eventId)}
              />
            </>
          );
        }
    }
  }
}
