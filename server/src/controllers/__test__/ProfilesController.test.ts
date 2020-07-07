import ProfilesController from "../ProfilesController";
import { Request, Response } from "express";
import { UserFactory } from "../../test/factories/UserFactor";
import mongoose from "mongoose";
import { Profile, IProfile } from "api/Profiles";

describe("insert", () => {
  beforeAll(async () => {
    const url = `mongodb+srv://dbUser:dbPassword@cluster0-55vit.azure.mongodb.net/test?retryWrites=true&w=majority`;
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: false
    });
  });

  afterAll(async () => {
    await Profile.collection.drop();
    await Profile.db.close();
  });

  it("should insert a profile", async (done: any) => {
    const user = UserFactory();
    const mReq = ({
      body: { firstName: "Asdf", lastName: "bob" },
      user: { _id: "5eeaad1d96c9409bc72465c7" }
    } as any) as Request;
    const mRes = ({ json: jest.fn() } as any) as Response;
    const mNext = jest.fn();
    await new ProfilesController().post(mReq, mRes, mNext);
    const p: IProfile = (await Profile.findOne({})) as IProfile;
    expect(p.firstName).toBe("Asdf");
    done();
  });
});
