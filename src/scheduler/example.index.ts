import { Queue, Worker } from "bullmq";
import IORedis from "ioredis";
import { REDIS_URI, SCHEDULER_QUEUE_NAME, SCHEDULER_REMOVE_CONFIG } from "./const";

const connection = new IORedis(REDIS_URI);

const queue = new Queue(SCHEDULER_QUEUE_NAME, {
  connection,
  defaultJobOptions: {
    removeOnComplete: SCHEDULER_REMOVE_CONFIG.REMOVE_ON_COMPLETE,
    removeOnFail: SCHEDULER_REMOVE_CONFIG.REMOVE_ON_FAIL
  }
});

queue.add("cars", { color: "blue" });

const worker = new Worker(SCHEDULER_QUEUE_NAME, async job => {
  if (job.name === "cars") {
    console.log(job.data.color);
  }
}, { connection });

// (async () => {
//   await worker.run();
// })();
