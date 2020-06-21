import dotenv from "dotenv";

const env = process.env.NODE_ENV || "development";

console.log(`Environment is ${env}`);
// Set the env file
const result2 = dotenv.config({
  path: `./env/${env}.env`
});

if (result2.error) {
  throw result2.error;
}
