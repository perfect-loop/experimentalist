import React from "react";
import { Card, CardHeader, Avatar, CardContent, makeStyles } from "@material-ui/core";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const SearchCard = (props: any) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={<Avatar alt="Venmo Logo" src="https://cdn1.venmo.com/marketing/images/branding/venmo-icon.svg" />}
        title="Search venmo Handle"
      />
      <CardContent>{props.children}</CardContent>
    </Card>
  );
};

export default SearchCard;
