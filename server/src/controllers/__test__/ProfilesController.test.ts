import ProfilesController from "../ProfilesController";
import { Request, Response } from "express";
import { Profile, IProfile } from "models/Profiles";

describe("Profile", () => {
  const status = { send: jest.fn() };
  const mRes = ({
    send: jest.fn(),
    json: jest.fn(),
    status: jest.fn(httpStatus => status)
  } as any) as Response;
  const mNext = jest.fn();

  it("should insert a profile", async (done: any) => {
    const mReq = ({
      body: {
        firstName: "Asdf",
        lastName: "bob",
        venmoId: "doneid"
      },
      user: { _id: "5eeaad1d96c9409bc72465c7" }
    } as any) as Request;

    const res = new ProfilesController().post(mReq, mRes, mNext);

    res.then(async () => {
      const p: IProfile = (await Profile.findOne({})) as IProfile;
      expect(p.firstName).toBe("Asdf");
      done();
    });
  });

  it("updates profile", async (done: any) => {
    const profile = new Profile({
      firstName: "ilya",
      user: { _id: "5eeaad1d96c9409bc72465c8" }
    });

    await profile.save();

    const mReq = ({
      body: {
        firstName: "Asad",
        lastName: "Roger",
        venmoId: "noname"
      },
      user: { _id: "5eeaad1d96c9409bc72465c8" }
    } as any) as Request;

    console.log(profile._id);

    const res = new ProfilesController().put(mReq, mRes, mNext);

    res?.then(async result => {
      const updatedProfile = (await Profile.findById(profile.id)) as IProfile;
      expect(updatedProfile.firstName).toBe("Asad");
      expect(updatedProfile.lastName).toBe("Roger");
      done();
    });
  });
});
