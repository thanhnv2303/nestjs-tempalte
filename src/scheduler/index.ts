// import { Queue, Worker } from "bullmq";
// import { REDIS_URI, SCHEDULER_QUEUE_NAME, SCHEDULER_REDIS_CONNECTION, SCHEDULER_REMOVE_CONFIG } from "./const";


// const queue = new Queue(SCHEDULER_QUEUE_NAME, {
//   connection: SCHEDULER_REDIS_CONNECTION,
//   defaultJobOptions: {
//     removeOnComplete: SCHEDULER_REMOVE_CONFIG.REMOVE_ON_COMPLETE,
//     removeOnFail: SCHEDULER_REMOVE_CONFIG.REMOVE_ON_FAIL
//   }
// });


// const worker = new Worker(SCHEDULER_QUEUE_NAME, async job => {
//   if (job.name === "cars") {
//     console.log(job.data.color);
//   }
// }, { connection: SCHEDULER_REDIS_CONNECTION });

// // (async () => {
// //   await worker.run();
// // })();

// export default queue;
