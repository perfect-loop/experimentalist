import express, { Request, Response, NextFunction } from "express";
import secured from "../lib/middleware/secured";
import VenmoController from "../controllers/VenmoController";

const router = express.Router();

router.post(
  "/venmo.json",
  secured(),
  (req: Request, res: Response, next: NextFunction) => {
    new VenmoController().login(req, res, next);
  }
);

router.post(
  "/venmo/mfa.json",
  secured(),
  (req: Request, res: Response, next: NextFunction) => {
    new VenmoController().mfa(req, res, next);
  }
);

export default router;
