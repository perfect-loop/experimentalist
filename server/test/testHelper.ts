import mongoose from "mongoose";
import "../src/LoadEnv";
import { Profile } from "models/Profiles";
import { server } from "../src/index";

beforeAll(async (done: any) => {
  const MONGO_URI = process.env.MONGO_URL || "";
  // mongodb://127.0.0.1:27017/experimentalist_test`;
  await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: false
  });
  // await mongoose.connection.db.dropDatabase();
  // Profile.remove({})
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.remove({});
  }
  done();
});

afterAll(async (done: any) => {
  // await mongoose.connection.db.dropDatabase();
  done();
});

afterEach(async (done: any) => {
  // await mongoose.connection.db.dropDatabase();
  jest.clearAllMocks();
  done();
});