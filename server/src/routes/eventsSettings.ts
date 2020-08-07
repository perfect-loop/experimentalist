import express from "express";
import secured from "../lib/middleware/secured";
import EventSettingsController from "../controllers/EventSettingsController";

const router = express.Router();

router.post(
  "/events/:eventId/eventSettings.json",
  secured(),
  async (req, res, next) => {
    new EventSettingsController().post(req, res, next);
  }
);

router.get(
  "/events/:eventId/eventSettings.json",
  secured(),
  async (req, res, next) => {
    new EventSettingsController().index(req, res, next);
  }
);

export default router;
