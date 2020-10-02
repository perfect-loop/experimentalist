import React from "react";
import { Redirect } from "react-router-dom";
import { observer } from "mobx-react";
import { Typography } from "@material-ui/core";
import { IProfile } from "models/Profiles";
import { IEventSettings } from "models/EventSettings";
import ProfileStore from "../../Profile/storage/ProfileStore";
import { EventSettingsStore } from "../../EventSettings/store/EventSettingsStore";
import Edit from "../../Profile/Edit";

interface Props {
  eventId: string;
  eventSettingsStore: EventSettingsStore;
  profileStore: ProfileStore;
  profileData: IProfile;
}

const nextUrl = (eventId: string): string => {
  return `/events/${eventId}/conference`;
};

const PaymentMethodRenderer: React.SFC<Props> = ({ eventId, eventSettingsStore, profileStore, profileData }) => {
  switch (eventSettingsStore.state.kind) {
    case "empty":
    case "not_ready":
      return <div>Loading</div>;
    case "ready": {
      const settings: IEventSettings = eventSettingsStore.state.data[0];

      if (settings?.paymentMethod === "venmo") {
        if (profileData && profileData.venmoId) {
          return <Redirect to={nextUrl(eventId)} />;
        }
      }

      if (settings?.paymentMethod !== "venmo" && profileData) {
        return <Redirect to={nextUrl(eventId)} />;
      }

      return (
        <>
          <Typography variant="h6">Please update your profile</Typography>
          <Edit
            requireVenmo={settings && settings.paymentMethod === "venmo"}
            profileStore={profileStore}
            afterSuccessPath={nextUrl(eventId)}
            eventPaymentMethod={settings.paymentMethod}
          />
        </>
      );
    }
  }
};

export default observer(PaymentMethodRenderer);
