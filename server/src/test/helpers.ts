import { Response } from "express";

export const mockResponse = () => {
  const res = {} as Response;
  res.send = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};
