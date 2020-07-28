import React from "react";
import { Link } from "react-router-dom";
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";
import { IParticipation } from "api/Participations";
import { StyledTableRow } from "./StyledTableRow";
import { StyledTableCell } from "./StyledTableCell";
import EventStatus from "./EventStatus";

function nextUrl(participation: IParticipation): string {
  if (participation.verificationImageUrl) {
    return `/events/${participation.event._id}/conference`;
  } else {
    return `/events/${participation.event._id}/verify/${participation._id}`;
  }
}

export default function AttendeeEvent(props: { participation: IParticipation }) {
  const url = nextUrl(props.participation);
  return (
    <StyledTableRow key={props.participation.event._id}>
      <StyledTableCell align="center">
        <Link to={url}>{props.participation.event.title}</Link>
      </StyledTableCell>
      <StyledTableCell align="center">
        <Link to={url}>
          <PlayCircleFilledWhiteIcon />
        </Link>
      </StyledTableCell>
      <StyledTableCell align="center">
        <EventStatus event={props.participation.event} />
      </StyledTableCell>
    </StyledTableRow>
  );
}
