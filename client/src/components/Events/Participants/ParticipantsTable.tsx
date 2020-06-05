import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles, withStyles, Theme, createStyles } from "@material-ui/core";
import { IEvent } from "api/Events";
import { Link } from "react-router-dom";
import SettingsIcon from '@material-ui/icons/Settings';
import GroupIcon from '@material-ui/icons/Group';
import { IParticipation } from "api/Participations";

const useStyles = makeStyles({
  table: {
    minWidth: 50,
    maxWidth: 500,
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
    <TableContainer>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <StyledTableCell align="right"> Email </StyledTableCell>
            <StyledTableCell align="right"> Role </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.participants.map((participant: IParticipation) => (
            <StyledTableRow key={participant._id}>
              <StyledTableCell align="right"> {participant.email} </StyledTableCell>
              <StyledTableCell align="right"> {participant.role} </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
