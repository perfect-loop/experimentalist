import mongoose from "mongoose";
import { Profile } from "api/Profiles";

beforeAll(async (done: any) => {
  const url = `mongodb+srv://dbUser:dbPassword@cluster0-55vit.azure.mongodb.net/test?retryWrites=true&w=majority`;
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: false
  });
  done();
});

afterAll(async (done: any) => {
  await Profile.collection.drop();
  await Profile.db.close();
  done();
});
