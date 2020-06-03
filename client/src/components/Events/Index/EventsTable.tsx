import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import API from "api"
import { makeStyles, withStyles, Theme, createStyles } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 50,
    maxWidth: 300,
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
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }),
)(TableRow);

export default function EventsTable(props: { events: API.IEvent[] }) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} >
      <Table className={classes.table} >
        <TableHead>
          <TableRow>
            <StyledTableCell align="right" > Id </StyledTableCell>
            <StyledTableCell align="right" > Name </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody >
          {
            props.events.map((event: API.IEvent) => (
              <StyledTableRow key={event._id} >
                <StyledTableCell component="th" scope="row" >
                  {event._id}
                </StyledTableCell>
                <StyledTableCell align="right" > {event.title} </StyledTableCell>
              </StyledTableRow>
            ))
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}
