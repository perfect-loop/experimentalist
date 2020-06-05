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

export default function EventsTable(props: { events: IEvent[] }) {
  const classes = useStyles();

  return (
    <TableContainer>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <StyledTableCell align="right"> Id </StyledTableCell>
            <StyledTableCell align="right"> Name </StyledTableCell>
            <StyledTableCell align="right"> Go </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.events.map((event: IEvent) => (
            <StyledTableRow key={event._id}>
              <StyledTableCell component="th" scope="row">
                {event._id}
              </StyledTableCell>
              <StyledTableCell align="right"> {event.title} </StyledTableCell>
              <StyledTableCell align="right">
                <Link to={`/events/${event._id}`}>go</Link>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
