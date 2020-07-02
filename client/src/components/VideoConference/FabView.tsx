import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { IParticipation } from "api/Participations";
import { Rnd } from "react-rnd";
import SpeedDialTooltipOpen from "./SpeedDialTooltipOpen";
import Broadcast from "./speeddial/Broadcast";

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

export default function FloatingActionButtonZoom(props: { participant: IParticipation }) {
  const [broadcastOpen, setBroadcastOpen] = React.useState(false);

  const handleBroadcastClickOpen = () => {
    setBroadcastOpen(true);
  };

  const handleBroadcastClickClose = () => {
    setBroadcastOpen(false);
  };

  return (
    <>
      <Broadcast defaultOpen={broadcastOpen} handleBroadcastClickClose={handleBroadcastClickClose} />
      <Rnd
        default={{
          x: 150,
          y: 100,
          width: 80,
          height: 200,
        }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(240, 240, 240, 0)",
          zIndex: 50,
        }}
      >
        <SpeedDialTooltipOpen participant={props.participant} handleBroadcastClickOpen={handleBroadcastClickOpen} />
      </Rnd>
    </>
  );
}
