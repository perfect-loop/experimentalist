const f = () => {
  return (req: any, res: any, next: any) => {
    res.locals.user = req.user;
    next();
  };
};

export default f;
