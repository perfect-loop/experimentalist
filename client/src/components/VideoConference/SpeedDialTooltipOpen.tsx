import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";
import { IParticipation } from "models/Participations";
import CustomizedDialogs from "./CustomizedDialogs";
import { Api } from "../../util/api";
import { IEvent } from "models/Events";
import { isLocked, isStarted } from "models/Helpers";
import { AxiosResponse } from "axios";
import RecordVoiceOverIcon from "@material-ui/icons/RecordVoiceOver";
import AdmitAll from "./speeddial/AdmitAll";
import Lock from "./speeddial/Lock";

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
      fontSize: "10px",
      position: "absolute",
      background: "none",
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    tooltip: {
      fontSize: "60px",
      maxWidth: 500,
      background: "red",
    },
  }),
);

export default function SpeedDialTooltipOpen(props: { participant: IParticipation; handleBroadcastClickOpen: any }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [hidden] = React.useState(false);
  const [showActivate, setShowActivate] = React.useState(!isStarted(props.participant.event));
  const [showLock, setShowLock] = React.useState(!isLocked(props.participant.event));

  const handleVisibility = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleEventActivate = () => {
    const api = new Api();
    api
      .put<IEvent, IEvent>(`/api/events/${props.participant.event._id}/activate.json`)
      .then((response: AxiosResponse<IEvent>) => {
        const event = response.data;
        setShowActivate(false);
        console.log(event);
      });
  };

  const handleLockClick = () => {
    const api = new Api();
    api
      .put<IEvent, IEvent>(`/api/events/${props.participant.event._id}/lock.json`)
      .then((response: AxiosResponse<IEvent>) => {
        const event = response.data;
        setShowLock(false);
        console.log(event);
      })
      .catch(error => {
        console.error(error);
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
          {(props.participant.role === "host" || props.participant.role === "assistant") && (
            <SpeedDialAction
              key="Broadcast"
              icon={<RecordVoiceOverIcon onClick={props.handleBroadcastClickOpen} />}
              tooltipTitle="Broadcast"
              tooltipOpen
            />
          )}
          {(props.participant.role === "host" || props.participant.role === "assistant") && showActivate && (
            <SpeedDialAction
              key="Start"
              icon={<PlayCircleFilledWhiteIcon />}
              tooltipTitle="Start"
              onClick={handleEventActivate}
              tooltipOpen
            />
          )}
          {props.participant.role === "host" && (
            <SpeedDialAction
              key="AdmitAll"
              icon={<AdmitAll />}
              tooltipTitle="Admit Everyone"
              tooltipOpen
              TooltipClasses={classes}
            />
          )}
          {(props.participant.role === "host" || props.participant.role === "assistant") && showLock && (
            <SpeedDialAction
              key="Lock"
              icon={<Lock />}
              tooltipTitle="Lock Meeting"
              tooltipOpen
              open={true}
              onClick={handleLockClick}
              TooltipClasses={classes}
            />
          )}
        </SpeedDial>
      </div>
    </>
  );
}
