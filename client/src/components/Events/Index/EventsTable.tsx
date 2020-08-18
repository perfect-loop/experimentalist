import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core";
import { IParticipation } from "models/Participations";
import HostEvent from "./HostEvent";
import AttendeeEvent from "./AttendeeEvent";
import HostHeader from "./HostHeader";
import AttendeeHeader from "./AttendeeHeader";
import ImageUpload from "../../ImageUpload";

const useStyles = makeStyles({
  table: {
    minWidth: 50,
    maxWidth: 600,
  },
});

export default function EventsTable(props: { participations: IParticipation[] }) {
  const classes = useStyles();
  const isHost = props.participations.some((p: IParticipation) => p.role === "host" || p.role === "assistant");
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
            const p = participation;
            if (participation.role === "host" || participation.role === "assistant") {
              return <HostEvent participation={p} classes={classes} key={participation._id} />;
            } else {
              return <AttendeeEvent participation={p} key={participation._id} />;
            }
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
