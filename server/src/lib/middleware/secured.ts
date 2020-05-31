const f = () => {
  // tslint:disable-next-line:no-function-expression
  return function secured(req: any, res: any, next: any) {
    if (req.user) {
      return next();
    }
    // res.redirect("/api/auth/login");
    res.status(403).render();
  };
};

export default f;
