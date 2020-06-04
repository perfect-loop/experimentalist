import React from "react";
import { API_DOMAIN } from "../../util/config";
import { Auth0User } from "../../util/react-auth0-spa";
import { Link } from "react-router-dom";

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

        <a className="btn btn-primary" href={`${API_DOMAIN}/api/auth/logout`}>
          Logout
        </a>
      </>
    );
  }
}
