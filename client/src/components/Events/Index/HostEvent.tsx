import React from "react";
import { Link } from "react-router-dom";
import SettingsIcon from "@material-ui/icons/Settings";
import GroupIcon from "@material-ui/icons/Group";
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";
import { IParticipation } from "models/Participations";
import { StyledTableRow } from "./StyledTableRow";
import { StyledTableCell } from "./StyledTableCell";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import EventStatus from "./EventStatus";

export default function HostEvent(props: { participation: IParticipation; classes: Record<"table", string> }) {
  return (
    <StyledTableRow key={props.participation.event._id}>
      <StyledTableCell align="right"> {props.participation.event.title} </StyledTableCell>
      <StyledTableCell align="right">
        <Link to={`/events/${props.participation.event._id}`}>
          <PlayCircleFilledWhiteIcon />
        </Link>
      </StyledTableCell>
      <StyledTableCell align="center">
        <EventStatus event={props.participation.event} />
      </StyledTableCell>
      <StyledTableCell align="right">
        <Link to={`/events/${props.participation.event._id}/participants`}>
          <GroupIcon />
        </Link>
      </StyledTableCell>
      <StyledTableCell align="center">
        <Link to={`/events/${props.participation.event._id}/admin/compensations`}>
          <LocalAtmIcon />
        </Link>
      </StyledTableCell>
      <StyledTableCell align="center">
        <Link to={`/events/${props.participation.event._id}/host/settings`}>
          <SettingsIcon />
        </Link>
      </StyledTableCell>
    </StyledTableRow>
  );
}
