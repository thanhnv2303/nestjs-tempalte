import { Queue } from 'bullmq';
import { SCHEDULER_QUEUE_NAME, SCHEDULER_REDIS_CONNECTION, SCHEDULER_REMOVE_CONFIG } from "./const";

const queue = new Queue(
    SCHEDULER_QUEUE_NAME, 
    {
        connection: SCHEDULER_REDIS_CONNECTION,
        defaultJobOptions: {
            removeOnComplete: SCHEDULER_REMOVE_CONFIG.REMOVE_ON_COMPLETE,
            removeOnFail: SCHEDULER_REMOVE_CONFIG.REMOVE_ON_FAIL
        }
    }
);

export async function removeRepeatableJob(jobName: string) {
    const repeatableJobs = await queue.getRepeatableJobs(1, -1, true);
    if (repeatableJobs.length > 0) {
        repeatableJobs.forEach(async (repeatableJob) => {
            if (repeatableJob.name == jobName) {
                await queue.removeRepeatableByKey(repeatableJob.key);
            }
        })
    }
    return true;
}

export async function removeDelayedJob(jobName: string) {
    const delayedJobs = await queue.getDelayed(1, -1);
    if (delayedJobs.length > 0) {
        delayedJobs.forEach(async (delayedJob) => {
            if (delayedJob.name == jobName) {
                await queue.remove(delayedJob.id);
            }
        })
    }
}

export async function schedularCreateVotteryJob(jobName: string, data: object, pattern: string) {
    await removeDelayedJob(jobName);
    await removeRepeatableJob(jobName);
    await queue.add(
        jobName,
        data,
        {
            repeat: {
                pattern: pattern
            }
        }
    );
}

export async function schedularAddFundJob(jobName: string, data: object, pattern: string) {
    await removeDelayedJob(jobName);
    await removeRepeatableJob(jobName);
    await queue.add(
        jobName,
        data,
        {
            repeat: {
                pattern: pattern
            }
        }
    );
}