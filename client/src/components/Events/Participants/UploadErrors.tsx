import React from "react";
import { observer } from "mobx-react";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles, withStyles, Theme, createStyles } from "@material-ui/core";
import ParticipantsStore from "../storage/ParticipantsStore";
import { ParticipantUploadError } from "models/Errors";

const useStyles = makeStyles({
  table: {},
  container: {
    maxHeight: 500,
  },
});

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black,
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

interface Props {
  store: ParticipantsStore;
  errors: ParticipantUploadError[];
}

const errmsg = (msg: string) => {
  if (msg.includes("email_1_event_1_role_1 dup")) {
    return "Duplicate username";
  } else if (msg.includes("anonymousName_1_event_1 dup")) {
    return "Duplicate label";
  } else {
    return "Could not upload participant";
  }
};

const UploadErrors: React.SFC<Props> = ({ store, errors }) => {
  const classes = useStyles();
  return (
    <div>
      {errors.length > 0 && (
        <>
          <Alert severity="error" onClose={store.closeErrorAlerts}>
            <AlertTitle>There was an error uploading the participants below:</AlertTitle>
          </Alert>
          <TableContainer className={classes.container}>
            <Table className={classes.table} stickyHeader>
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center"> Email </StyledTableCell>
                  <StyledTableCell align="center"> Label </StyledTableCell>
                  <StyledTableCell align="center"> Error </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {errors.map((error, idx) => (
                  <StyledTableRow key={idx}>
                    <StyledTableCell align="center">{error.op?.email}</StyledTableCell>
                    <StyledTableCell align="center">{error.op?.anonymousName} </StyledTableCell>
                    <StyledTableCell align="center">{errmsg(error.errmsg)} </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </div>
  );
};

export default observer(UploadErrors);
