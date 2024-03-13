import { createClient } from "redis";
import Logging from "../library/logging";

const client = createClient();

client.on("error", (err) => console.log("Redis Client Error", err));

client.connect().then(() => {
  Logging.info("Redis connected successfully.");
});

export default client;