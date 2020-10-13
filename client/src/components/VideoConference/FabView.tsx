import React from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import { Rnd } from "react-rnd";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { IParticipation } from "models/Participations";
import SpeedDialTooltipOpen from "./speeddial/SpeedDialTooltipOpen";
import Broadcast from "./speeddial/Broadcast";
import { IEventSettings } from "models/EventSettings";

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function FloatingActionButtonZoom(props: { participant: IParticipation; eventSettings: IEventSettings }) {
  const [broadcastOpen, setBroadcastOpen] = React.useState(false);

  const handleBroadcastClickOpen = () => {
    setBroadcastOpen(true);
  };

  const handleBroadcastClickClose = () => {
    setBroadcastOpen(false);
  };

  return (
    <>
      <Broadcast
        defaultOpen={broadcastOpen}
        handleBroadcastClickClose={handleBroadcastClickClose}
        eventId={props.participant.event._id}
      />
      <Rnd
        default={{
          x: 150,
          y: 200,
          width: 80,
          height: 250,
        }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(240, 240, 240, 0)",
          zIndex: 50,
        }}
      >
        <SpeedDialTooltipOpen
          participant={props.participant}
          handleBroadcastClickOpen={handleBroadcastClickOpen}
          eventSettings={props.eventSettings}
        />
      </Rnd>
    </>
  );
}

export default observer(FloatingActionButtonZoom);
