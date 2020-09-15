import React from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";
import { IParticipation } from "models/Participations";
import { IEventSettings } from "models/EventSettings";
import { StyledTableRow } from "../StyledTableRow";
import { StyledTableCell } from "../StyledTableCell";
import EventStatus from "../EventStatus";
import { EventSettingsStore } from "../../../EventSettings/store/EventSettingsStore";

const nextUrl = (participation: IParticipation, eventSettings: IEventSettings): string => {
  if (eventSettings && !eventSettings.requireId) {
    return `/events/${participation.event._id}/payment`;
  }

  if (participation.verificationImageUrl) {
    return `/events/${participation.event._id}/payment`;
  } else {
    return `/events/${participation.event._id}/verify/${participation._id}`;
  }
};

interface Props {
  participation: IParticipation;
  eventSettingsStore: EventSettingsStore;
}

const Event: React.SFC<Props> = ({ participation, eventSettingsStore }) => {
  switch (eventSettingsStore.state.kind) {
    case "empty":
    case "not_ready":
      return <></>;
    case "ready": {
      const eventSettings = eventSettingsStore.state.data[0] as IEventSettings;
      const url = nextUrl(participation, eventSettings);
      return (
        <StyledTableRow key={participation.event._id}>
          <StyledTableCell align="center">
            <Link to={url}>{participation.event.title}</Link>
          </StyledTableCell>
          <StyledTableCell align="center">
            <Link to={url}>
              <PlayCircleFilledWhiteIcon />
            </Link>
          </StyledTableCell>
          <StyledTableCell align="center">
            <EventStatus event={participation.event} />
          </StyledTableCell>
        </StyledTableRow>
      );
    }
  }
};

export default observer(Event);
