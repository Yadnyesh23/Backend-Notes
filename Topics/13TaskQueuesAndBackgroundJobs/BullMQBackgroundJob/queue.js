import { Queue } from "bullmq"
import IORedis from "ioredis"

const connection = new IORedis();

export const orderQueue = new Queue("orderQueue",{connection});