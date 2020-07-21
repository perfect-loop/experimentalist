import React from "react";
import { StyledTableCell } from "./StyledTableCell";

export default function HostHeader() {
  return (
    <>
      <StyledTableCell align="center"> Title </StyledTableCell>
      <StyledTableCell align="center"> Go </StyledTableCell>
      <StyledTableCell align="center"> Status </StyledTableCell>
      <StyledTableCell align="center"> Participants </StyledTableCell>
      <StyledTableCell align="center"> Settings </StyledTableCell>
      <StyledTableCell align="center"> Compensation </StyledTableCell>
    </>
  );
}
