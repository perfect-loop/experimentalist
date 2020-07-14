import express from "express";
import secured from "../lib/middleware/secured";
import CompensationsController from "../controllers/CompensationsControllers";
import { Compensation } from "api/Compensations";
import { Participation } from "api/Participations";
import { Event } from "api/Events";

const router = express.Router();

// refractor required. id refers to EventId (should be put in event routes)
router.get("/compensations/:id.json", secured(), async (req, res, next) => {
  new CompensationsController().userCompensation(req, res, next);
});

router.get("/my/compensations/:id.json", secured(), async (req, res, next) => {
  new CompensationsController().adminCompensation(req, res, next);
});

router.post("/compensations/:id.json", secured(), async (req, res, next) => {
  new CompensationsController().createCompensation(req, res, next);
});

// id => compensationId
router.post("/compensations/:id/pay", secured(), async (req, res, next) => {
  new CompensationsController().pay(req, res, next);
});

export default router;
