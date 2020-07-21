import React from "react";
import { StyledTableCell } from "./StyledTableCell";

export default function AttendeeHeader() {
  return (
    <>
      <StyledTableCell align="center"> Title </StyledTableCell>
      <StyledTableCell align="center"> Go </StyledTableCell>
      <StyledTableCell align="center"> Status </StyledTableCell>
    </>
  );
}
