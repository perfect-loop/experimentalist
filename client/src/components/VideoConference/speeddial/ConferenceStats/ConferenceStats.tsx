import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Grid } from "@material-ui/core";
import PeopleIcon from "@material-ui/icons/People";
import { useAppContext } from "../../../../context/AppContext";
import { Api } from "models/Socket";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 12,
  },
});

export default function StatsCard(props: { numParticipants: number }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        Room statistics
        <Grid container direction="row" alignItems="center">
          <PeopleIcon />
          &nbsp;Participants {props.numParticipants}
        </Grid>
      </CardContent>
    </Card>
  );
}
