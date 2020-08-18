import { Request, Response, NextFunction } from "express";
import logger from "../shared/Logger";
import { Auth0User } from "types/auth0";
import { Profile, IProfile } from "models/Profiles";
import { Api } from "models/Socket";

export default class ProfilesController {
  public async post(req: Request, res: Response, next: NextFunction) {
    logger.info("got request to create profile");
    const body = req.body;
    const user: Auth0User = req.user as Auth0User;

    const profile = new Profile(body) as IProfile;
    profile.userId = user._id;

    await profile
      .save()
      .then((newProfile: IProfile) => {
        logger.info(`Created profile ${newProfile}`);
        res.json(newProfile);
      })
      .catch((reason: any) => {
        logger.info(`Error is ${reason.message}`);
        const error: Api.Error = {
          message: reason.message
        };
        res.status(500).send(error);
      });
  }
}
