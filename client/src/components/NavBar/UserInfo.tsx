import React from "react";
import { API_DOMAIN } from "../../util/config";
import { Auth0User } from "../../util/react-auth0-spa";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { Link as RegularLink } from "@material-ui/core";

interface IProps {
  user: Auth0User;
  logout: any;
}

export class UserInfo extends React.Component<IProps, {}> {
  user: Auth0User;
  constructor(props: IProps) {
    super(props);
    this.user = props.user;
  }

  render() {
    return (
      <>
        <div>Logged in as {this.user.email}</div>
        <Button component={Link} to={"/events"} color="primary" variant="contained">
          Events
        </Button>
        <Button component={RegularLink} href={`${API_DOMAIN}/api/auth/logout`} color="primary">
          Logout
        </Button>
      </>
    );
  }
}
