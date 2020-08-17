import express from "express";
import secured from "../lib/middleware/secured";
import CompensationsController from "../controllers/CompensationsControllers";
import { Compensation } from "models/Compensations";
import { Participation } from "models/Participations";
import { Event } from "models/Events";
import { Transaction } from "models/Transactions";

const router = express.Router();

// refractor required. id refers to EventId (should be put in event routes)
router.get(
  "/events/:eventId/compensations.json",
  secured(),
  async (req, res, next) => {
    new CompensationsController().userCompensation(req, res, next);
  }
);

router.get(
  "/admin/events/:eventId/compensations.json",
  secured(),
  async (req, res, next) => {
    new CompensationsController().adminCompensation(req, res, next);
  }
);

router.post(
  "/events/:eventId/compensations.json",
  secured(),
  async (req, res, next) => {
    new CompensationsController().createCompensation(req, res, next);
  }
);

// id => compensationId
router.post("/compensations/:id/pay", secured(), async (req, res, next) => {
  new CompensationsController().pay(req, res, next);
});

export default router;
