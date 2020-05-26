import React from "react";
import { AUTH0_CLIENT_ID } from "../../util/config";

interface IProps {
  user: any;
  logout: any;
}

export class UserInfo extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    return (
      <>
        <div>Logged in as {this.props.user.picture}</div>
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