import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles, withStyles, Theme, createStyles } from "@material-ui/core";
import { IParticipation } from "api/Participations";
import HostEvent from "./HostEvent";
import AttendeeEvent from "./AttendeeEvent";
import HostHeader from "./HostHeader";
import AttendeeHeader from "./AttendeeHeader";

const useStyles = makeStyles({
  table: {
    minWidth: 50,
    maxWidth: 600,
  },
});

export default function EventsTable(props: { participations: IParticipation[] }) {
  const classes = useStyles();
  const isHost = props.participations.some((p: IParticipation) => p.role === "host");
  const header = isHost ? <HostHeader /> : <AttendeeHeader />;

  return (
    <TableContainer>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>{header}</TableRow>
        </TableHead>
        <TableBody>
          {props.participations.map((participation: IParticipation) => {
            // const p: IParticipation = participation;
            const p = {
              _id: participation._id,
              email: participation.email,
              event: participation.event,
              role: participation.role,
              anonymousName: participation.anonymousName,
            };
            if (participation.role === "host") {
              return <HostEvent participation={p} classes={classes} />;
            } else {
              return <AttendeeEvent participation={p} classes={classes} />;
            }
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
