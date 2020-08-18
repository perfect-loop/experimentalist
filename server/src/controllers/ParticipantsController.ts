import { Request, Response, NextFunction } from "express";
import logger from "../shared/Logger";
import { Participation } from "models/Participations";
import { Auth0User } from "types/auth0";

export default class ParticipantsController {
  public async patch(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const user = req.user as Auth0User;

    if (!user) {
      res.status(403).send("Unauthorized");
      return;
    }

    const participation = await Participation.findOne({
      _id: id,
      email: user.email
    });
    if (!participation) {
      res.status(404).send("Not found");
      return;
    }

    const body = req.body;
    logger.info("Updating with ", body);

    participation.verificationImageUrl = body.verificationImageUrl;

    try {
      await participation.validate();
    } catch (err) {
      if (err.name === "ValidationError") {
        logger.error("Error Validating!", err);
        res.status(422).json(err);
        return;
      } else {
        res.status(500);
        return;
      }
    }

    await participation.save();

    res.json(participation);
  }
}
