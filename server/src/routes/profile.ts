import express from "express";
import secured from "../lib/middleware/secured";
import {}
const router = express.Router();

router.get("/profile", (req, res, next) => {
  res.status(200).send("Pong");
});

router.post("/profile", secured(), async (req: any, res, next) => {
  const id = req.parms.id;
});

export default router;
