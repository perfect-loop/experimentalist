import React from "react";
import { AUTH0_CLIENT_ID } from "../../util/config";
import { User } from "../../models/user";

interface IProps {
  user: any;
  logout: any;
}

export class UserInfo extends React.Component<IProps, {}> {
  realUser: User;
  constructor(props: IProps) {
    super(props);
    this.realUser = new User(props.user);
  }

  render() {
    return (
      <>
        <div>Logged in as {this.realUser.userProfile?.picture}</div>
        <a href="/video" className="btn btn-primary">
          Start conference
        </a>
        <button
          className="btn btn-primary"
          onClick={() =>
            this.props.logout({
              returnTo: "http://localhost:3001",
              // eslint-disable-next-line @typescript-eslint/camelcase
              client_id: AUTH0_CLIENT_ID,
            })
          }
        >
          Log out
        </button>
      </>
    );
  }
}
