import express from "express";
import secured from "../lib/middleware/secured";
import { Auth0User } from "types/auth0";

const router = express.Router();

router.get("/profile", secured(), (req: any, res, next) => {
  const user: Auth0User = req.user;
  res.status(200).send(`user id is ${user._id}`);
});

router.post("/profile", secured(), (req, res, next) => {
  res.status(200).send("Pong");
});

export default router;
