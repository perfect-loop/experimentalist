import ProfilesController from "../ProfilesController";
import { Request, Response } from "express";
import { Profile, IProfile } from "models/Profiles";

describe("insert", () => {
  const status = { send: jest.fn() };
  const mRes = ({
    send: jest.fn(),
    status: jest.fn(httpStatus => status)
  } as any) as Response;
  const mNext = jest.fn();

  it("should insert a profile", async (done: any) => {
    const mReq = ({
      body: {
        firstName: "Asdf",
        lastName: "bob",
        venmoId: "www.venmo.com/asdf"
      },
      user: { _id: "5eeaad1d96c9409bc72465c7" }
    } as any) as Request;

    await new ProfilesController().post(mReq, mRes, mNext);

    const p: IProfile = (await Profile.findOne({})) as IProfile;
    expect(p.firstName).toBe("Asdf");
    done();
  });

  it("should not insert a profile for invalid venmo", async (done: any) => {
    const mReq = ({
      body: {
        firstName: "Asdf",
        lastName: "bob",
        venmoId: "asdf"
      },
      user: { _id: "5eeaad1d96c9409bc72465c7" }
    } as any) as Request;
    await new ProfilesController().post(mReq, mRes, mNext);
    expect(mRes.status).toBeCalledWith(500);
    done();
  });
});
