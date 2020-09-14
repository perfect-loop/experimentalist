import mongoose from "mongoose";
import "../src/LoadEnv";
import { Profile } from "models/Profiles";

beforeAll(async (done: any) => {
  const MONGO_URI = process.env.MONGO_URL || "";
  // mongodb://127.0.0.1:27017/experimentalist_test`;
  await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: false
  });
  done();
});

afterAll(async (done: any) => {
  await mongoose.connection.db.dropDatabase();
  done();
});

afterEach(async (done: any) => {
  // await mongoose.connection.db.dropDatabase();
  done();
});
