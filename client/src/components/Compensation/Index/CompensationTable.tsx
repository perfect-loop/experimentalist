import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles, withStyles, Theme, createStyles } from "@material-ui/core";
import { IUserCompensation } from "api/Compensations";
import PublishSharpIcon from "@material-ui/icons/PublishSharp";
import { Button } from "@material-ui/core";

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

export default function CompensationsTable(props: {
  compensations: IUserCompensation[];
  pay: (compensation: IUserCompensation) => void;
}) {
  const classes = useStyles();
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { idx } = e.currentTarget.dataset;
    if (idx === undefined) return;
    props.pay(props.compensations[parseInt(idx)]);
  };

  return (
    <TableContainer className={classes.container}>
      <Table className={classes.table} stickyHeader>
        <TableHead>
          <TableRow>
            <StyledTableCell align="center"> Name </StyledTableCell>
            <StyledTableCell align="center"> Email </StyledTableCell>
            <StyledTableCell align="center"> Compensation </StyledTableCell>
            <StyledTableCell align="center"> Venmo Id </StyledTableCell>
            <StyledTableCell align="center"> Pay </StyledTableCell>
            <StyledTableCell align="center"> Transaction Id </StyledTableCell>
            <StyledTableCell align="center"> Transaction Date </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.compensations.map(({ profile, compensation, email, transactions }, idx) => (
            <StyledTableRow key={compensation._id}>
              <StyledTableCell align="center">
                {profile ? profile.firstName + " " + profile.lastName : "N/A"}
              </StyledTableCell>
              <StyledTableCell align="center">{email}</StyledTableCell>
              <StyledTableCell align="center">{compensation.amount}</StyledTableCell>
              <StyledTableCell align="center"> {profile ? profile.venmoId : "N/A"} </StyledTableCell>
              <StyledTableCell align="center">
                <Button
                  data-idx={idx}
                  color="primary"
                  disabled={compensation.amount === 0 || compensation.status === "Paid"}
                  onClick={handleClick}
                >
                  <PublishSharpIcon />
                </Button>
              </StyledTableCell>
              <StyledTableCell align="center">
                {" "}
                {transactions.length ? transactions[0].transactionId : "N/A"}{" "}
              </StyledTableCell>
              <StyledTableCell align="center"> {transactions.length ? transactions[0].date : "N/A"} </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
