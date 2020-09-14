import express from "express";
import secured from "../lib/middleware/secured";
import { Profile } from "models/Profiles";
import { Auth0User } from "types/auth0";
import ProfilesController from "../controllers/ProfilesController";
import logger from "../shared/Logger";

const router = express.Router();

router.get("/profile.json", secured(), async (req: any, res, next) => {
  const user: Auth0User = req.user;
  const userId = user._id;
  // finding profiles based on userId
  const profile = await Profile.findOne({ userId });
  logger.info(`Profile has been fetched ${profile}`);
  if (!profile) {
    res.status(404).send("Profile not found!");
    return;
  }

  res.status(200).json([profile]);
});

router.post("/profile.json", secured(), async (req: any, res, next) => {
  new ProfilesController().post(req, res, next);
});

router.put("/profile.json", secured(), async (req: any, res, next) => {
  new ProfilesController().put(req, res, next);
});

export default router;
