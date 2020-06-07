import React, { Component } from "react";
import ConferenceView, { Role } from "./ConferenceView";
import { Auth0User, useAuth0 } from "../../util/react-auth0-spa";

interface IProps {
  role: Role;
}

// export class VideoConference extends Component<IProps> {
//   constructor(props: IProps) {
//     super(props);
//   }

//   render = () => {
//     return (
//       <ConferenceView role={this.props.role} user={this.props.user} />
//     )
//   }
// }

export default function VideoConference(props: IProps) {
  const auth0 = useAuth0();
  const isAuthenticated = auth0.isAuthenticated;
  const user = auth0.user;
  if (!isAuthenticated || !user) {
    return <>Not allowed</>;
  } else {
    console.log(`Logging in as ${JSON.stringify(user)}`);
    return <ConferenceView role={props.role} user={user} />;
  }
}
