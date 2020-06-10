import React from "react";
import { Link } from "react-router-dom";
import SettingsIcon from "@material-ui/icons/Settings";
import GroupIcon from "@material-ui/icons/Group";
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";
import moment from "moment";
import { IParticipation } from "api/Participations";
import { StyledTableRow } from "./StyledTableRow";
import { StyledTableCell } from "./StyledTableCell";

export default function AttendeeEvent(props: { participation: IParticipation; classes: Record<"table", string> }) {
  return (
    <StyledTableRow key={props.participation.event._id}>
      <StyledTableCell align="right"> {props.participation.event.title} </StyledTableCell>
      <StyledTableCell align="right">
        {moment(props.participation.event.startAt).format("MMMM Do YYYY, h:mm:ss a")}
      </StyledTableCell>
      <StyledTableCell align="right">
        <Link to={`/events/${props.participation.event._id}`}>
          <PlayCircleFilledWhiteIcon />
        </Link>
      </StyledTableCell>
      <StyledTableCell />
      <StyledTableCell />
    </StyledTableRow>
  );
}
