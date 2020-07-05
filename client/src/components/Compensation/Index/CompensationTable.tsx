import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles, withStyles, Theme, createStyles } from "@material-ui/core";
import { IUserCompensation } from "./AdminCompensations";
import { IProfile } from "api/Profiles";
import { ICompensation } from "api/Compensations";

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

export default function CompensationsTable(props: { compensations: IUserCompensation[] }) {
  const classes = useStyles();
  return (
    <TableContainer className={classes.container}>
      <Table className={classes.table} stickyHeader>
        <TableHead>
          <TableRow>
            <StyledTableCell align="right"> Name </StyledTableCell>
            <StyledTableCell align="right"> Email </StyledTableCell>
            <StyledTableCell align="right"> Compensation </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.compensations.map(({ profile, compensation, email }) => (
            <StyledTableRow key={compensation._id}>
              <StyledTableCell align="right">
                {profile ? profile.firstName + " " + profile.lastName : "/"}
              </StyledTableCell>
              <StyledTableCell align="right">{email}</StyledTableCell>
              <StyledTableCell align="right">{compensation.amount}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
