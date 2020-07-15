import React from "react";
import { Link } from "react-router-dom";
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";
import { IParticipation } from "api/Participations";
import { StyledTableRow } from "./StyledTableRow";
import { StyledTableCell } from "./StyledTableCell";

export default function AttendeeEvent(props: { participation: IParticipation; classes: Record<"table", string> }) {
  return (
    <StyledTableRow key={props.participation.event._id}>
      <StyledTableCell align="center">
        <Link to={`/events/${props.participation.event._id}/conference`}>{props.participation.event.title}</Link>
      </StyledTableCell>
      <StyledTableCell align="center">
        <Link to={`/events/${props.participation.event._id}/conference`}>
          <PlayCircleFilledWhiteIcon />
        </Link>
      </StyledTableCell>
    </StyledTableRow>
  );
}
