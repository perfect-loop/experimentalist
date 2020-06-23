import express from "express";
import secured from "../lib/middleware/secured";
import { IProfile, Profile } from "api/Profile"
import { Auth0User } from "types/auth0";

const router = express.Router();

router.get("/profile", secured(), async (req: any, res, next) => {
  const email = req.user.email;
  console.log("requesting profile")
  // const profile = await Profile.find({email})
  // console.log(profile); 
  res.status(200).send("Pong");
});

router.post("/profile", async (req: any, res, next) => {
  // const id = req.parms.id;
  console.log("got request to create profile");
  const body = req.body;

  const user: Auth0User = req.user;
  res.status(200).send(`user id is ${user._id}`);
  console.log(`profilAttr is ${JSON.stringify(body)}`);

  const profile = new Profile(body) as IProfile;

  // profile
  //   .save()
  //   .then((newProfile: IProfile) => {
  //     console.log(`profile is ${newProfile}`);
  //     res.json(newProfile);
  //   })
  //   .catch((reason: any) => {
  //     console.log(reason.constructor);
  //     res.status(500).send(reason.message);
  //   });
  console.log(profile);
});
// router.get("/profile", secured(), (req: any, res, next) => {

// });

// router.post("/profile", secured(), (req, res, next) => {
//   res.status(200).send("Pong");
// });

export default router;
