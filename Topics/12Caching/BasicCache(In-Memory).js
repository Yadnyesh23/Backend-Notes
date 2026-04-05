import express from "express";

const app = express();

const cache = new Map();

// ✅ Fixed function
const fetchWeatherData = async (city) => {
    console.log("Fetching weather data...");
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                city,
                temp: Math.floor(Math.random() * 30)
            });
        }, 1000);
    });
};

app.get("/weather/:city", async (req, res) => {
    const { city } = req.params;
    const key = `weather_${city}`;

    // 🔹 Check cache
    if (cache.has(key)) {
        const cached = cache.get(key);

        // ✅ TTL check
        if (Date.now() < cached.expiry) {
            console.log("Cache Hit");
            return res.json({
                source: "cache",
                data: cached.data
            });
        }

        // ❌ Expired
        console.log("Cache Expired");
        cache.delete(key);
    }

    // 🔴 Cache Miss
    console.log("Cache Miss");

    const data = await fetchWeatherData(city);

    // ✅ Store with TTL
    cache.set(key, {
        data,
        expiry: Date.now() + 10000 // 10 sec
    });

    res.json({
        source: "api",
        data
    });
});

app.listen(3000, () => {
    console.log("Server listening...");
});
// Request
//  ↓
// Check cache
//    ↓
// Hit → return fast ⚡
// Miss → API call 🌐 → store → return