import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles, withStyles, Theme, createStyles, Badge, Tooltip, Grid } from "@material-ui/core";
import { IParticipationProfile } from "models/Participations";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import PeopleIcon from "@material-ui/icons/People";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import HelpIcon from "@material-ui/icons/Help";

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

export default function ParticipantsTable(props: { participants: IParticipationProfile[] }) {
  const classes = useStyles();

  return (
    <>
      <Tooltip title={`There are ${props.participants.length} participants in this event (including hosts)`}>
        <Badge badgeContent={props.participants.length} color="primary">
          <PeopleIcon />
        </Badge>
      </Tooltip>
      <TableContainer className={classes.container}>
        <Table className={classes.table} stickyHeader>
          <TableHead>
            <TableRow>
              <StyledTableCell align="center"> Email </StyledTableCell>
              <StyledTableCell align="center"> Id </StyledTableCell>
              <StyledTableCell align="center"> Role </StyledTableCell>
              <StyledTableCell align="center"> Anonymized Name </StyledTableCell>
              <StyledTableCell align="center"> First Name </StyledTableCell>
              <StyledTableCell align="center"> Last Name </StyledTableCell>
              <StyledTableCell align="center">
                <Grid container direction="row" alignItems="center">
                  Attended
                  <Tooltip title="Participants who were the waiting room.">
                    <HelpIcon fontSize="small" style={{ color: "grey" }} />
                  </Tooltip>
                </Grid>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Grid container direction="row" alignItems="center">
                  Admitted
                  <Tooltip title="Participants who were admitted into the main conference.">
                    <HelpIcon fontSize="small" style={{ color: "grey" }} />
                  </Tooltip>
                </Grid>
              </StyledTableCell>
              <StyledTableCell align="center">
                <Grid container direction="row" alignItems="center">
                  Participated
                  <Tooltip title="Participants who were in the conference when the event was started by the host.">
                    <HelpIcon fontSize="small" style={{ color: "grey" }} />
                  </Tooltip>
                </Grid>
              </StyledTableCell>
              <StyledTableCell align="center"> Instructions </StyledTableCell>
              <StyledTableCell align="center"> Experiment </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.participants.map(({ profile, participant }, idx) => (
              <StyledTableRow key={idx}>
                <StyledTableCell align="center"> {participant.email} </StyledTableCell>
                <StyledTableCell>
                  {participant.verificationImageUrl && (
                    <a href={participant.verificationImageUrl} target="_blank" rel="noopener noreferrer">
                      <PhotoCameraIcon></PhotoCameraIcon>
                    </a>
                  )}
                </StyledTableCell>
                <StyledTableCell align="center"> {participant.role} </StyledTableCell>
                <StyledTableCell align="center">
                  {participant.role === "host" ? "" : participant.anonymousName}
                </StyledTableCell>
                <StyledTableCell align="center"> {profile ? profile.firstName : ""} </StyledTableCell>
                <StyledTableCell align="center"> {profile ? profile.lastName : ""} </StyledTableCell>
                <StyledTableCell align="center">{!!participant.attendedAt && <CheckCircleIcon />}</StyledTableCell>
                <StyledTableCell align="center">{!!participant.admittedAt && <CheckCircleIcon />}</StyledTableCell>
                <StyledTableCell align="center">{!!participant.participatedAt && <CheckCircleIcon />}</StyledTableCell>
                <StyledTableCell align="center"> {participant.instructions} </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
