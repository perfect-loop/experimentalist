import { IProfile } from "models/Profiles";
import Store from "../../Store/Store";
import { ProfileType } from "models/decoders/ProfileType";

export default class ProfileStore extends Store<IProfile> {
  urlPrefix(): string {
    return `/api/profile`;
  }

  public index<T>() {
    return super.index<T>(ProfileType);
  }
}
