import mongoose from "mongoose";
import "../src/LoadEnv";
import { Profile } from "models/Profiles";

beforeAll(async (done: any) => {
  const MONGO_URI = process.env.MONGO_URL || "";
  // mongodb://127.0.0.1:27017/experimentalist_test`;
  console.log(`Connecting to Mongo ${MONGO_URI}`)
  await mongoose.connect(MONGO_URI, {
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
