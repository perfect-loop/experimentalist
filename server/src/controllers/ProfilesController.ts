import { Request, Response, NextFunction } from "express";
import logger from "../shared/Logger";
import { Auth0User } from "types/auth0";
import { Profile, IProfile } from "api/Profiles";
import { Api } from "api/Socket";

export default class ProfilesController {
  public async post(req: Request, res: Response, next: NextFunction) {
    logger.info("got request to create profile");
    const body = req.body;
    const user: Auth0User = req.user as Auth0User;

    console.log(`profilAttr is ${JSON.stringify(body)}`);

    const profile = new Profile(body) as IProfile;
    profile.userId = user._id;

    profile
      .save()
      .then((newProfile: IProfile) => {
        console.log(`profile is ${newProfile}`);
        res.json(newProfile);
      })
      .catch((reason: any) => {
        logger.error(reason.message);
        const error: Api.Error = {
          message: reason.message
        };
        res.status(500).send(error);
      });
  }
}
