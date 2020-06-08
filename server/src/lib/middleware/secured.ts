const f = () => {
  return function secured(req: any, res: any, next: any): void {
    if (req.user) {
      console.log(`Logged in as ${req.user.email}`);
      return next();
    }
    // res.redirect("/api/auth/login");
    res.status(403).send("Unauthorized");
  };
};

export default f;
