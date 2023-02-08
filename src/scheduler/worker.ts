import { Worker, Job } from 'bullmq';
import { SCHEDULER_QUEUE_NAME, SCHEDULER_REDIS_CONNECTION } from './const';

const worker = new Worker(
    SCHEDULER_QUEUE_NAME,
    async job => {
        const jobType = job.name.split("-")[0];
        switch (jobType) {
            case "createVottery":
                await createVotteryJob();
                break;
            case "addFund":
                await addFundJob();
            default:
                break;
        }
    }, { connection: SCHEDULER_REDIS_CONNECTION }
)

async function createVotteryJob() {
    console.log('process createVotteryJob');
    return true;
}

async function addFundJob() {
    console.log('process addFundJob');  
    return true;
}

export default { createVotteryJob, addFundJob }