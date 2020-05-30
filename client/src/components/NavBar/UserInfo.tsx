import React from "react";
import { API_DOMAIN } from "../../util/config";
import { Auth0User } from "../../util/react-auth0-spa";

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
        <a href="/video" className="btn btn-primary">
          Start conference
        </a>
        <a className="btn btn-primary" href={`http://${API_DOMAIN}/api/auth/logout`}>
          Logout
        </a>
      </>
    );
  }
}
