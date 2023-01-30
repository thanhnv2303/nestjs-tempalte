import { config } from "dotenv";
import IORedis from "ioredis";

config({ path: __dirname + "/../../.env" });

export const SCHEDULER_QUEUE_NAME = process.env.SCHEDULER_QUEUE_NAME || "vottery";
export const SCHEDULER_DASHBOARD_PATH = process.env.SCHEDULER_DASHBOARD_PATH || "/scheduler/dashboard";
export const REDIS_URI = process.env.REDIS_URI || "redis://username:password@localhost:6379";

export const SCHEDULER_REDIS_CONNECTION = new IORedis(REDIS_URI);
export const SCHEDULER_REMOVE_CONFIG = {
  REMOVE_ON_COMPLETE: {
    age: 86400, // keep up to 1 hour
    count: 1000 // keep up to 1000 jobs
  },
  REMOVE_ON_FAIL: {
    count: 5000
  }
};


