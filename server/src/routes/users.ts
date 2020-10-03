import express from "express";
import secured from "../lib/middleware/secured";
import { Auth0User } from "types/auth0";
import logger from "../shared/Logger";
const router = express.Router();

router.get("/user", secured(), (req, res, next) => {
  res.render("user", {
    user: req.user,
    title: "Profile page"
  });
});

interface Auth0Request {
  user: Auth0User;
}

router.get(
  "/user.json",
  secured(),
  (req: Auth0Request, res: any, next: any) => {
    if (req.user) {
      const user: Auth0User = req.user;
      res.json(user);
    }
  }
);

export default router;
