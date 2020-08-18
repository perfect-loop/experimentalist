import mongoose from "mongoose";
import { Profile } from "models/Profiles";

beforeAll(async (done: any) => {
  const url = `mongodb://127.0.0.1:27017/experimentalist_test`;
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: false
  });
  console.log("Connected to database");
  done();
});

afterAll(async (done: any) => {
  // await Profile.collection.drop();
  // await Profile.db.close();
  // console.log("Dropping database");
  // await mongoose.connection.db.dropDatabase();
  done();
});
