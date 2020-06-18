import express from "express";
const router = express.Router();

router.get("/ping", (req, res, next) => {
  res.status(200).send("Pong");
});

export default router;
