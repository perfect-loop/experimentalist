import React from "react";
import { Link } from "react-router-dom";
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";
import moment from "moment";
import { IParticipation } from "api/Participations";
import { StyledTableRow } from "./StyledTableRow";
import { StyledTableCell } from "./StyledTableCell";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";

export default function AttendeeEvent(props: { participation: IParticipation; classes: Record<"table", string> }) {
  return (
    <StyledTableRow key={props.participation.event._id}>
      <StyledTableCell align="right">
        <Link to={`/events/${props.participation.event._id}/conference`}>{props.participation.event.title}</Link>
      </StyledTableCell>
      <StyledTableCell align="right">
        {moment(props.participation.event.startAt).format("MMMM Do YYYY, h:mm:ss a")}
      </StyledTableCell>
      <StyledTableCell align="right">
        <Link to={`/events/${props.participation.event._id}/conference`}>
          <PlayCircleFilledWhiteIcon />
        </Link>
      </StyledTableCell>
    </StyledTableRow>
  );
}
