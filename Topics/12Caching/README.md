## 🔍 What is Caching?
Caching is a mechanism designed to **decrease latency** and computational overhead by storing a **subset of data** in a high-speed storage layer. This allows subsequent requests for that data to be served faster than fetching it from its primary, slower source.

## Real-World Example: Caching Google Weather Data

This example demonstrates the **Cache-Aside (Lazy Loading)** strategy used to handle high-frequency requests for slowly-changing data.

---

## 🛠 The Workflow

1.  **User Request:** A user searches for "Weather in London."
2.  **Cache Lookup:** The backend checks **Redis** (In-Memory Store) for the key `weather_london`.
    * **Cache Hit:** Data is found and returned in **<1ms**.
    * **Cache Miss:** Data is missing or expired; proceed to step 3.
3.  **Heavy Lift:** The server fetches fresh data from an **External Weather API** (e.g., OpenWeather). This is slow (~500ms) and often costs money per request.
4.  **Update Cache:** The server saves the fresh data into Redis with a **TTL (Time to Live)** of 15 minutes.
5.  **Response:** The user receives the weather data.



---

## 💡 Key Technical Concepts

* **TTL (Time to Live):** We set a 15-minute expiration so users don't see "Sunny" if it starts "Raining" an hour later.
* **Cost Optimization:** Instead of 1,000,000 expensive API calls, the system only makes **1 call every 15 minutes** (96 calls per day).
* **Availability:** If the External Weather API crashes, the system can still serve the "last known" cached weather to users.

---
