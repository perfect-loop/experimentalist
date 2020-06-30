import User from "entities/User";
import express from "express";
import passport from "passport";

const router = express.Router();

if (process.env.NODE_ENV === "development") {
  router.post(
    "/auth/mock",
    passport.authenticate("local", {
      session: false
    }),
    (req, res) => {
      console.log("inside stuff");
      const user = req.user as User;
      console.log(user);
      req.logIn(user, (error: any) => {
        const returnTo = req.session?.returnTo;
      });
      res.status(200).send("Authenticated mock");
      return;
    }
  );
}
export default router;
