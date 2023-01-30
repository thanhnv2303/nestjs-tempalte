import { Queue } from "bullmq";
import { BullMonitorExpress } from "@bull-monitor/express";
import { REDIS_URI, SCHEDULER_QUEUE_NAME } from "./const";
import IORedis from "ioredis";
import { BullMQAdapter } from "@bull-monitor/root/dist/bullmq-adapter";


const connection = new IORedis(REDIS_URI);

const queueMQ = new Queue(SCHEDULER_QUEUE_NAME, { connection });


const dashboard = new BullMonitorExpress({
  queues: [
    new BullMQAdapter(queueMQ),
    // readonly queue
    // new BullMQAdapter(queueMQ, { readonly: true })
  ],
  // enables graphql introspection query. false by default if NODE_ENV == production, true otherwise
  gqlIntrospection: true,
  // enable metrics collector. false by default
  // metrics are persisted into redis as a list
  // with keys in format "bull_monitor::metrics::{{queue}}"
  metrics: {
    // collect metrics every X
    // where X is any value supported by https://github.com/kibertoad/toad-scheduler
    collectInterval: { hours: 1 },
    maxMetrics: 100,
    // disable metrics for specific queues
    blacklist: ["1"]
  }
});
(async () => {
  await dashboard.init();
})();


export default dashboard;
