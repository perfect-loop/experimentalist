import express from "express";

const router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  res.send("<h1>Hello world</h1>");
});

export default router;
