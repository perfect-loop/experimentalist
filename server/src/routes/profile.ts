import express from "express";
const router = express.Router();

router.get("/profile", (req, res, next) => {
  res.status(200).send("Pong");
});

router.post("/profile", (req, res, next) => {
  res.status(200).send("Pong");
});

export default router;
