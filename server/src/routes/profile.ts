import express from "express";
import secured from "../lib/middleware/secured";
import { IProfile, Profile } from "api/Profiles";
import { Auth0User } from "types/auth0";
import ProfilesController from "../controllers/ProfilesController";

const router = express.Router();

router.get("/profile.json", secured(), async (req: any, res, next) => {
  const user: Auth0User = req.user;
  const userId = user._id;
  // finding profiles based on userId
  const profile = await Profile.findOne({ userId });
  console.log(`Profile has been fetched ${profile}`);
  if (!profile) {
    res.status(404).send("Profile not found!");
    return;
  }

  res.status(200).json(profile);
});

router.post("/profile.json", secured(), async (req: any, res, next) => {
  new ProfilesController().post(req, res, next);
});

export default router;
