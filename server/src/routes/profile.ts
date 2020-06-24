import express from "express";
import secured from "../lib/middleware/secured";
import { IProfile, Profile } from "api/Profiles"
import { Auth0User } from "types/auth0";

const router = express.Router();

router.get("/profile.json", secured(), async (req: any, res, next) => {
  const user: Auth0User = req.user;
  const userId = user._id;
  // finding profiles based on userId 
  const profile = await Profile.findOne({userId})
  console.log(`Profile has been fetched ${profile}`); 
  if (!profile) {
    res.status(404).send("Profile not found!")
    return
  }

  res.status(200).json(profile);
});

router.post("/profile.json", secured(), async (req: any, res, next) => {
  console.log("got request to create profile");
  const body = req.body;
  const user: Auth0User = req.user;

  console.log(`profilAttr is ${JSON.stringify(body)}`);

  const profile = new Profile(body) as IProfile;
  profile.userId = user._id

  profile
    .save()
    .then((newProfile: IProfile) => {
      console.log(`profile is ${newProfile}`);
      res.json(newProfile);
    })
    .catch((reason: any) => {
      console.log(reason.constructor);
      res.status(500).send(reason.message);
    });
});

export default router;
