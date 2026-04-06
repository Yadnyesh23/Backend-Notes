import { Worker } from "bullmq";
import IORedis from "ioredis";

const connection = new IORedis();

const worker = new Worker(
    "orderQueue",
    async (job) => {
        console.log("🧾 Processing job:", job.name);

        if (job.name === "generateInvoice") {
            const { orderId } = job.data;

            console.log(`📦 Generating invoice for order ${orderId}`);

            // simulate delay
            await new Promise((res) => setTimeout(res, 2000));

            console.log(`✅ Invoice generated for order ${orderId}`);
        }
    },
    { connection }
);

worker.on("completed", (job) => {
    console.log(`🎉 Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
    console.error(`❌ Job ${job.id} failed:`, err.message);
});