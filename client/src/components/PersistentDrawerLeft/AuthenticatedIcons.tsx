import React from "react";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { API_DOMAIN } from "../../util/config";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import EventNoteIcon from "@material-ui/icons/EventNote";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useAuth0 } from "../../util/react-auth0-spa";
import { Link } from "react-router-dom";

export default function AuthenticatedIcons(props: any) {
  const auth0 = useAuth0();
  const isAuthenticated = auth0.isAuthenticated;
  const user = auth0.user;
  if (!isAuthenticated) {
    return <></>;
  } else {
    return (
      <>
        <List>
          <ListItem button key={"Experiments"}>
            {user?.email}
          </ListItem>
          <Link to="/profile">
            <ListItem button key={"Profile"}>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary={"Profile"} />
            </ListItem>
          </Link>
          <Link to="/events">
            <ListItem button key={"Experiments"}>
              <ListItemIcon>
                <EventNoteIcon />
              </ListItemIcon>
              <ListItemText primary={"Experiments"} />
            </ListItem>
          </Link>
        </List>
        <a href={`${API_DOMAIN}/api/auth/logout`}>
          <ListItem button key={"Logout"}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary={"Logout"} />
          </ListItem>
        </a>
      </>
    );
  }
}
