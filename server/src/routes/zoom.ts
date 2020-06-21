import express from "express";
import { Role } from "api/Zoom";
import { Participation } from "api/Participations";
import crypto from "crypto";
import secured from "../lib/middleware/secured";
const router = express.Router();

const API_KEY = "d9X8t8-HQgi33MzVsdZKcg";
const API_SECRET = "oBBj6t1iz60wXXCTkHZPNHni19qJCM5LiLdd";
export const ZOOM_MEETING_NUMBER = 7503424717;
export const ZOOM_PASSWORD = "1e3AM8";

router.get(
  "/zoom/:participantId/signature.json",
  secured(),
  async (req: any, res, next) => {
    const participantId = req.params.participantId;
    const participant = await Participation.findById(participantId);
    if (!participant) {
      res.status(404).send("Not found");
      return;
    }

    const role: Role = participant.role === "host" ? Role.Host : Role.Attendee;

    const timestamp = new Date().getTime() - 30000;
    const msg = Buffer.from(
      API_KEY + ZOOM_MEETING_NUMBER + timestamp + role
    ).toString("base64");
    const hash = crypto
      .createHmac("sha256", API_SECRET)
      .update(msg)
      .digest("base64");
    const signature = Buffer.from(
      `${API_KEY}.${ZOOM_MEETING_NUMBER}.${timestamp}.${role}.${hash}`
    ).toString("base64");

    res.json({
      signature: signature
    });
  }
);

export default router;
