const f = () => {
  return (req: any, res: any, next: any) => {
    // console.log(`userInview ${JSON.stringify(res)}`);
    console.log(`userInview ${JSON.stringify(req.user)}`);
    res.locals.user = req.user;
    next();
  };
};

export default f;
