import express from "express";
import { createClient } from "redis";

const app = express();

const redisClient = createClient();

redisClient.on("error", (err) => {
    console.error("Redis error:", err);
});

await redisClient.connect();

// Fake DB/API
const fetchProductApi = (id) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                id,
                name: "Laptop",
                price: 800
            });
        }, 1000);
    });
};

// Sleep helper
const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

app.get("/product/:id", async (req, res) => {
    const { id } = req.params;
    const key = `product_${id}`;
    const lockKey = `lock:${key}`;

    try {
        // 🔹 1. Check cache
        let cachedData = await redisClient.get(key);

        if (cachedData) {
            console.log("⚡ Cache Hit");
            return res.json({
                source: "cache",
                data: JSON.parse(cachedData)
            });
        }

        console.log("❌ Cache Miss");

        // 🔹 2. Try acquiring lock
        const isLocked = await redisClient.set(lockKey, "locked", {
            NX: true,     // Only set if not exists
            EX: 5         // Lock expires in 5 sec (safety)
        });

        if (isLocked) {
            // ✅ You got the lock
            console.log("🔒 Lock acquired");

            const data = await fetchProductApi(id);

            // Store in cache
            await redisClient.setEx(key, 20, JSON.stringify(data));

            // Release lock
            await redisClient.del(lockKey);

            return res.json({
                source: "db",
                data
            });
        } else {
            // ❌ Lock not acquired → wait and retry
            console.log("⏳ Waiting for cache...");

            let retries = 5;

            while (retries--) {
                await sleep(200); // wait 200ms

                cachedData = await redisClient.get(key);

                if (cachedData) {
                    console.log("⚡ Cache Filled by another request");
                    return res.json({
                        source: "cache",
                        data: JSON.parse(cachedData)
                    });
                }
            }

            // Fallback (rare case)
            console.log("⚠️ Fallback to DB");

            const data = await fetchProductApi(id);

            return res.json({
                source: "db-fallback",
                data
            });
        }

    } catch (err) {
        console.error("Error:", err.message);
        return res.status(500).json({
            error: "Internal Server Error"
        });
    }
});

app.listen(3000, () => {
    console.log("App listening on 3000");
});