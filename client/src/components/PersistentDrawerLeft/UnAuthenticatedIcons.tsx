import React from "react";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { API_DOMAIN } from "../../util/config";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { useAuth0 } from "../../util/react-auth0-spa";

export default function UnAuthenticatedIcons(props: any) {
  const auth0 = useAuth0();
  const isAuthenticated = auth0.isAuthenticated;
  if (isAuthenticated) {
    return <></>;
  } else {
    return (
      <>
        <a href={`${API_DOMAIN}/api/auth/login`}>
          <ListItem button key={"Login"}>
            <ListItemIcon>
              <VpnKeyIcon />
            </ListItemIcon>
            <ListItemText primary={"Login"} />
          </ListItem>
        </a>
      </>
    );
  }
}
