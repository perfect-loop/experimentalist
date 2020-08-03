import { Request, Response, NextFunction } from "express";
import logger from "../shared/Logger";
import { VenmoApi } from "../venmoApi";
import { Auth0User } from "types/auth0";
import Api from "api/Venmo";
import { session } from "passport";

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
        this.methods(req, res, next);
      })
      .catch(() => {
        res.status(500).send("Token is undefined");
      });
  }

  public selectMethod(req: Request, res: Response, next: NextFunction) {
    const methodId = req.params.id;
    if (!methodId) {
      res.status(402).send("Invalid method");
    }

    const user: Auth0User | undefined = req.user;
    if (!user) {
      res.status(403).send("Unauthorized");
      return;
    }

    const session = req.session;
    if (session) {
      logger.info(`Setting methodId ${methodId}`);
      session.venmoPaymentMethodId = methodId;
    }
    res.status(200).send("Done");
  }

  public methods(req: Request, res: Response, next: NextFunction) {
    const session = req.session;
    if (!session) {
      res.status(403).send("Unable to find venmo info");
      return;
    }

    const accessToken = session.venmoAccessToken;
    if (accessToken === undefined) {
      res.status(403).send("Invalid Venmo access token ");
      return;
    }

    const venmoApi = new VenmoApi();
    const user: Auth0User | undefined = req.user;

    if (!user) {
      res.status(403).send("Unauthorized");
      return;
    }

    venmoApi
      .getPaymentMethods(accessToken)
      .then((p: Api.Venmo.IPaymentMethod[]) => {
        const eligible = p.filter(
          method => method.peer_payment_role === "backup"
        );
        res.json(eligible).status(200);
      })
      .catch(() => {
        res.status(500).send("Unable to get payment methods");
      });
  }

  public account(req: Request, res: Response, next: NextFunction) {
    const session = req.session;
    if (!session) {
      res.status(403).send("Unable to find venmo info");
      return;
    }

    const accessToken = session.venmoAccessToken;
    if (accessToken === undefined) {
      res.status(403).send("Invalid Venmo access token ");
      return;
    }

    const venmoApi = new VenmoApi();
    const user: Auth0User | undefined = req.user;

    if (!user) {
      res.status(403).send("Unauthorized");
      return;
    }

    venmoApi
      .getAccount(accessToken)
      .then(accountInfo => {
        res.json(accountInfo).status(200);
      })
      .catch(() => {
        res.status(500).send("Unable to get payment methods");
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
