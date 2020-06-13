import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";
import { IParticipation } from "api/Participations";
import CustomizedDialogs from "./CustomizedDialogs";
import { Api } from "../../util/api";
import { IEvent } from "api/Events";
import { AxiosResponse } from "axios";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 600,
      background: "none",
      transform: "translateZ(0px)",
      flexGrow: 1,
    },
    backdrop: {
      opacity: 0,
      background: "none",
    },
    speedDial: {
      position: "absolute",
      background: "none",
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    alert: {
      width: "200px",
    },
  }),
);

export default function SpeedDialTooltipOpen(props: { participant: IParticipation }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [hidden] = React.useState(false);

  const handleVisibility = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleEventActivate = () => {
    const api = new Api();
    api
      .put<IEvent, IEvent>(`/api/events/${props.participant.event._id}/activate.json`)
      .then((response: AxiosResponse<IEvent>) => {
        const event = response.data;
        console.log(event);
      });
  };

  return (
    <>
      <div className={classes.root}>
        <SpeedDial
          ariaLabel="SpeedDial tooltip example"
          className={classes.speedDial}
          hidden={hidden}
          icon={<SpeedDialIcon />}
          onClick={handleVisibility}
          open={open}
        >
          <SpeedDialAction
            key="Instructions"
            icon={<CustomizedDialogs participant={props.participant} />}
            tooltipTitle="Instructions"
            tooltipOpen
          />
          {props.participant.role === "host" && (
            <SpeedDialAction
              key="Start"
              icon={<PlayCircleFilledWhiteIcon />}
              tooltipTitle="Start"
              onClick={handleEventActivate}
              tooltipOpen
            />
          )}
        </SpeedDial>
      </div>
    </>
  );
}
