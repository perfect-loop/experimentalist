import { Auth0User } from "../util/react-auth0-spa";

export class User {
  userProfile?: Auth0User;
  constructor(userProfile?: Auth0User) {
    this.userProfile = userProfile;
  }
}
