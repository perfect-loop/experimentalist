import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { IParticipation } from "api/Participations";
import { Rnd } from "react-rnd";
import SpeedDialTooltipOpen from "./SpeedDialTooltipOpen";

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
  return (
    <>
      <Rnd
        default={{
          x: 350,
          y: 100,
          width: 80,
          height: 80,
        }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(240, 240, 240, 0)",
          zIndex: 100,
        }}
      >
        <SpeedDialTooltipOpen participant={props.participant} />
      </Rnd>
    </>
  );
}
