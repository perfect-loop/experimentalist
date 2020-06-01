import express from "express";
import secured from "../lib/middleware/secured";
import { Auth0User } from "types/auth0";
const router = express.Router();

router.get("/user", secured(), (req, res, next) => {
  console.log(`inside /users, user is ${req.user}`);
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
    console.log(`inside /users, user is ${req.user}`);
    if (req.user) {
      const user: Auth0User = req.user;
      res.json(user);
    }
  }
);

export default router;
