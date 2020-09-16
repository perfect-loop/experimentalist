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
import CompensationsStore from "../storage/CompensationsStore";
import { IRawUploadedData } from "../storage/helpers";

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
  store: CompensationsStore;
  uploadWithErrors: IRawUploadedData[];
}

const UploadErrors: React.SFC<Props> = ({ store, uploadWithErrors }) => {
  const classes = useStyles();
  return (
    <div>
      {uploadWithErrors && uploadWithErrors.length > 0 && (
        <>
          <Alert severity="error" onClose={store.closeErrorAlerts}>
            <AlertTitle>There was an error uploading the compensation file. See details below</AlertTitle>
          </Alert>
          <TableContainer className={classes.container}>
            <Table className={classes.table} stickyHeader>
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center"> Email or Label </StyledTableCell>
                  <StyledTableCell align="center"> Amount </StyledTableCell>
                  <StyledTableCell align="center"> Currency </StyledTableCell>
                  <StyledTableCell align="center"> Error </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {uploadWithErrors.map((upload, idx) => (
                  <StyledTableRow key={idx}>
                    <StyledTableCell align="center">{upload.data[0]}</StyledTableCell>
                    <StyledTableCell align="center">{upload.data[1]}</StyledTableCell>
                    <StyledTableCell align="center">{upload.data[2]}</StyledTableCell>
                    <StyledTableCell align="center" style={{ color: "red" }}>
                      {upload.error}
                    </StyledTableCell>
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
