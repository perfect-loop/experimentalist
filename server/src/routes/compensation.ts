import express from "express";
import secured from "../lib/middleware/secured";
import CompensationsController from "../controllers/CompensationsControllers";
const router = express.Router();

router.get("/compensations/:id.json", secured(), async (req: any, res, next) => {
  new CompensationsController().userCompensation(req, res, next)
});

router.get("/my/compensations/:id.json", secured(), async (req: any, res, next) => {
  new CompensationsController().adminCompensation(req, res, next);
});

router.post("/compensation.json", secured(), async (req: any, res, next) => {
  const email = req.user.email;
  res.json(email);
});

export default router;
