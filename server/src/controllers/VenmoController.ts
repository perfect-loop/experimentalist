import { Request, Response, NextFunction } from "express";
import logger from "../shared/Logger";
import { VenmoApi } from "../venmoApi";

export default class VenmoController {
  public mfa(req: Request, res: Response, next: NextFunction) {
    const venmoOtp = req.body.venmoOtp;
    const api = new VenmoApi();
    const session = req.session;
    if (!session) {
      res.status(500).send("Unable to find venmo info");
      return;
    }
    api
      .mfaAuthenticate(session.otpToken, venmoOtp)
      .then((accessToken: string) => {
        logger.info("Saving venmoAccessToken into session");
        session.venmoAccessToken = accessToken;
        res.status(200).send(`Done`);
      })
      .catch(() => {
        res.status(500).send("Token is undefined");
      });
  }

  public login(req: Request, res: Response, next: NextFunction) {
    const user = req.body.username;
    const password = req.body.password;

    logger.info("Logging in to venmo as", user);
    const api = new VenmoApi();
    api
      .login(user, password)
      .then(otpToken => {
        if (!otpToken) {
          res.status(500).send("Token is undefined");
          return;
        }
        logger.info(`Token is ${otpToken}`);
        const session = req.session;
        if (session) {
          session.otpToken = otpToken;
        }
        api
          .authenticate2Factor(otpToken)
          .then(() => {
            res.status(200).send("Logged successfully");
            return;
          })
          .catch(() => {
            res.status(500).send("Unable to send 2FA request");
          });
      })
      .catch(() => {
        res.status(500).send("unable to get token");
      });
  }
}
