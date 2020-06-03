import express from "express";
import secured from "../lib/middleware/secured";
import Event from "../models/Events";
const router = express.Router();

router.get("/events.json", secured(), (req, res, next) => {
  new Event({ title: "Not title 4", startTime: Date(), active:  true}).save();
  Event.find().then((events: any) => {
    res.json(events);
  });

});

export default router;