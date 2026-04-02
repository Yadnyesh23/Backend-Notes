## 🔍 What is Caching?
Caching is a mechanism designed to **decrease latency** and computational overhead by storing a **subset of data** in a high-speed storage layer. This allows subsequent requests for that data to be served faster than fetching it from its primary, slower source.

---
## Real-World Examples

| Platform | Use Case | Benefit |
| :--- | :--- | :--- |
| **Google Search** | Caching results for common queries (e.g., "weather"). | Avoids re-running expensive ranking algorithms for every search. |
| **Netflix** | **CDN (Content Delivery Network)** at Edge locations. | Minimizes buffering by serving video from the server closest to the user. |
| **X (Twitter)** | Storing "Trending Topics" in in-memory stores like **Redis**. | Avoids analyzing billions of tweets in real-time for every user refresh. |

## Caching Google Weather Data

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

## What is CDN ?
A **Content Delivery Network (CDN)** is a global network of servers that store copies of content (like videos) so that when you hit **Play** the data only has to travel a few miles to your house, rather than thousands of miles from a main headquarters.

# 🎬 Case Study: Netflix & Content Delivery Networks (CDN)

Netflix uses a custom CDN architecture called **Open Connect** to serve billions of hours of content with zero buffering.

---

## 🚀 How it Works (The "Edge" Strategy)

1.  **Predictive Loading:** Netflix predicts what you'll watch and "pushes" those files to local servers during off-peak hours (nighttime).
2.  **Local Storage:** High-performance hardware called **OCAs (Open Connect Appliances)** are installed directly inside your ISP's data center.
3.  **Shortened Path:** When you hit **Play**, the video streams from a server in your city, not from Netflix HQ.

---

## 💎 Key Benefits of CDN Caching

* **Latency Elimination:** Reduces the physical distance data must travel.
* **ISP Efficiency:** Saves internet providers money by keeping massive video traffic within their own local networks.
* **High Availability:** If one local server fails, the system automatically redirects you to the next closest one.

---

##  Technical Logic: Adaptive Bitrate Caching

Netflix doesn't just cache one version of a movie; it caches **hundreds** of small chunks at different qualities:

| Quality | Bitrate | Use Case |
| :--- | :--- | :--- |
| **4K / UHD** | High | Stable Fiber/Ethernet connections |
| **1080p / HD** | Medium | Standard Home Wi-Fi |
| **480p / SD** | Low | Weak cellular signals / Commuting |