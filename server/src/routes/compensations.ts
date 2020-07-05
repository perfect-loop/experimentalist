import express from "express";
import secured from "../lib/middleware/secured";
import CompensationsController from "../controllers/CompensationsControllers";
import { Compensation } from "api/Compensations";
import { Participation } from "api/Participations";
import {Event } from "api/Events"

const router = express.Router();

router.get(
  "/compensations/:id.json",
  secured(),
  async (req: any, res, next) => {
    new CompensationsController().userCompensation(req, res, next);
  }
);

router.get(
  "/my/compensations/:id.json",
  secured(),
  async (req: any, res, next) => {
    new CompensationsController().adminCompensation(req, res, next);
  }
);

router.post(
  "/compensation/:id.json",
  secured(),
  async (req: any, res, next) => {
    new CompensationsController().createCompensation(req, res, next);
  }
);

export default router;