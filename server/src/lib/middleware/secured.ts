import logger from "../../shared/Logger";

const f = () => {
  return function secured(req: any, res: any, next: any): void {
    if (req.user) {
      logger.info(`Logged in as ${req.user.email}`);
      return next();
    }
    // res.redirect("/api/auth/login");
    res.status(403).send("Unauthorized");
  };
};

export default f;
