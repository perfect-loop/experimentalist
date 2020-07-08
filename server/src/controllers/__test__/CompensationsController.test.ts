import { Response, Request } from "express";
import CompensationsController from "../CompensationsControllers";

describe("insert", () => {
  const status = { send: jest.fn() };
  const res = ({
    send: jest.fn(),
    status: jest.fn(httpStatus => status)
  } as any) as Response;
  const mNext = jest.fn();

  it("returns unauthorized if event is not found", async (done: any) => {
    const mReq = ({
      params: {
        id: "5eeaad1d96c9409bc72465c7"
      },
      user: { _id: "5eeaad1d96c9409bc72465c7" }
    } as any) as Request;
    await new CompensationsController().adminCompensation(mReq, res, mNext);
    expect(res.status).toBeCalledWith(403);
    done();
  });
});
