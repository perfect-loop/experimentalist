import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles, withStyles, Theme, createStyles } from "@material-ui/core";
import { IParticipation } from "api/Participations";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

const useStyles = makeStyles({
  table: {},
  container: {
    maxHeight: 500,
  },
});

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }),
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }),
)(TableRow);

export default function ParticipantsTable(props: { participants: IParticipation[] }) {
  const classes = useStyles();

  return (
    <TableContainer className={classes.container}>
      <Table className={classes.table} stickyHeader>
        <TableHead>
          <TableRow>
            <StyledTableCell align="center"> Email </StyledTableCell>
            <StyledTableCell align="center"> Role </StyledTableCell>
            <StyledTableCell align="center"> Anonymized Name </StyledTableCell>
            <StyledTableCell align="center"> Attended </StyledTableCell>
            <StyledTableCell align="center"> Instructions </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.participants.map((participant: IParticipation) => (
            <StyledTableRow key={participant._id}>
              <StyledTableCell align="center"> {participant.email} </StyledTableCell>
              <StyledTableCell align="center"> {participant.role} </StyledTableCell>
              <StyledTableCell align="center"> {participant.anonymousName} </StyledTableCell>
              <StyledTableCell align="center">{!!participant.attendedAt && <CheckCircleIcon />}</StyledTableCell>
              <StyledTableCell align="center"> {participant.instructions} </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
