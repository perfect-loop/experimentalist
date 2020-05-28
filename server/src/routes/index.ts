import { Router } from "express";
import UserRouter from "./Users";

// Init router and path
const router = Router();

// Add sub-routes
// router.use('/users', UserRouter);

/* GET home page. */
// tslint:disable-next-line:only-arrow-functions
router.get("/", (req, res, next) => {
  res.render("index", { title: "Auth0 Webapp sample Nodejs" });
});

// Export the base-router
export default router;
