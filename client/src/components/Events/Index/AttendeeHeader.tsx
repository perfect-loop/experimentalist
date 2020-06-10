import React from "react";
import { StyledTableCell } from "./StyledTableCell";

export default function AttendeeHeader() {
  return (
    <>
      <StyledTableCell align="center"> Participants </StyledTableCell>
      <StyledTableCell align="center"> Settings </StyledTableCell>
      <StyledTableCell align="center"> Go </StyledTableCell>
    </>
  );
}
