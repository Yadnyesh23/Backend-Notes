##  What is Caching?
Caching is a mechanism designed to **decrease latency** and computational overhead by storing a **subset of data** in a high-speed storage layer. This allows subsequent requests for that data to be served much faster than fetching it from its primary (and slower) source.

---

##  Real-World Examples

| Platform | Use Case | Benefit |
| :--- | :--- | :--- |
| **Google Search** | Caching results for common queries (e.g., "weather") | Avoids re-running expensive ranking algorithms for every search |
| **Netflix** | CDN (Content Delivery Network) at Edge locations | Minimizes buffering by serving video from the nearest server |
| **X (Twitter)** | Storing "Trending Topics" in in-memory stores like Redis | Avoids analyzing billions of tweets in real-time |

---

## 🌦 Caching Google Weather Data

This example demonstrates the **Cache-Aside (Lazy Loading)** strategy used to handle high-frequency requests for slowly-changing data.

---

## 🛠 Workflow

1. **User Request:** A user searches for "Weather in London"
2. **Cache Lookup:** The backend checks **Redis (In-Memory Store)** for key `weather_london`
   - **Cache Hit:** Data is found → returned in **<1ms**
   - **Cache Miss:** Data missing/expired → go to step 3
3. **Heavy Lift:** Fetch fresh data from **External Weather API** (e.g., OpenWeather)
   - Slow (~500ms)  
   - May incur cost per request  
4. **Update Cache:** Store fresh data in Redis with **TTL (Time to Live)** = 15 minutes  
5. **Response:** Return weather data to user  

---

##  Key Technical Concepts

- **TTL (Time to Live):** Ensures data expires (e.g., prevents showing outdated weather)
- **Cost Optimization:** Instead of 1,000,000 API calls → only **1 call per 15 minutes (~96/day)**
- **High Availability:** If API fails, system can still serve **last cached data**

---

##  What is CDN?
A **Content Delivery Network (CDN)** is a globally distributed network of servers that store cached copies of content (videos, images, static files).  

 When you hit **Play**, data travels from the **nearest server**, not a distant origin → faster load times.

---

#  Case Study: Netflix & CDN

Netflix uses a custom CDN called **Open Connect** to deliver billions of hours of content efficiently.

---

##  How It Works (Edge Strategy)

1. **Predictive Loading:** Netflix predicts what users will watch and pushes content during off-peak hours  
2. **Local Storage:** Uses **OCAs (Open Connect Appliances)** inside ISP data centers  
3. **Shortened Path:** Streams video from nearby servers, not Netflix HQ  

---

##  Benefits of CDN Caching

- **Low Latency:** Reduces physical distance between user and data  
- **ISP Efficiency:** Keeps heavy traffic inside local networks  
- **High Availability:** Automatic failover to nearby servers  

---

##  Technical Logic: Adaptive Bitrate Caching

Netflix caches content in **small chunks across multiple quality levels**:

| Quality | Bitrate | Use Case |
| :--- | :--- | :--- |
| **4K / UHD** | High | Stable fiber/Ethernet |
| **1080p / HD** | Medium | Home Wi-Fi |
| **480p / SD** | Low | Weak networks / mobile |

 Player dynamically switches quality based on internet speed (**Adaptive Bitrate Streaming**)

---

#  Levels of Caching

## A.  Network Level

- **CDN:** Caches static assets (Images, Videos, JS/CSS) on edge servers  
- **DNS Caching:** Browsers, OS, and ISPs cache IPs to avoid repeated lookups  

---

##  CDN Working

1. User accesses a website → browser sends **DNS request**
2. Request is routed to nearest **PoP (Point of Presence / Edge Server)**
3. Routing based on:
   - Geographic location  
   - Network latency  

4. At PoP:
   - **Cache Hit → Fast response**
   - **Cache Miss → Fetch from origin server**

5. On Cache Miss:
   - Fetch data from **Origin Server**
   - Store in cache
   - Serve to user

---

##  DNS Working

The **Domain Name System (DNS)** translates domain names into IP addresses.

### Steps:

1. Browser sends **DNS query** to **Recursive Resolver (ISP)**
2. Resolver checks **local cache**
   - Found → return IP  

3. If not found:
   - Query **Root DNS Server**

4. Root → returns **TLD Server** (.com, .org)

5. Resolver → queries **TLD Server**

6. TLD → returns **Authoritative Name Server**

7. Resolver → queries Authoritative Server → gets **actual IP**

8. Resolver:
   - Returns IP to browser  
   - Caches result  

---

## B. ⚙ Hardware Level

- **CPU Cache:** L1, L2, L3 → ultra-fast access inside CPU  
- **RAM:** Main memory (fast but volatile)  

| Tier | Component | Speed | Capacity | Volatility | Scope |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **L1 Cache** | Level 1 | Fastest | ~64 KB | Volatile | Per-Core |
| **L2 Cache** | Level 2 | Very Fast | ~256 KB–1 MB | Volatile | Per-Core |
| **L3 Cache** | Level 3 | Fast | ~2–50 MB | Volatile | Shared |
| **RAM** | Main Memory | Moderate | 8–128 GB+ | Volatile | System |
| **Disk/SSD** | Storage | Slow | 256 GB–10 TB+ | Non-Volatile | Persistent |
| **Network (NIC)** | External | Slowest | Infinite | N/A | Global |

---

###  Backend Context

Technologies:
- **Redis**
- **Memcached**
- **AWS ElastiCache**

These provide:
- **In-Memory Storage**
- **NoSQL Databases**
- **Key-Value Stores**

---

#  Caching Strategies

## 1) Lazy Caching (Cache-Aside)

Caching happens **only when data is requested**

### Flow:
- Request → Check cache  
- Hit → Return data  
- Miss → Fetch from DB → Store in cache → Return  

 Most commonly used strategy  

---

## 2) Write-Through

Data is written to **cache + database simultaneously**

### Flow:
- Write operation (POST/PUT/PATCH)
- Update **DB + Cache together**

### Benefit:
- Cache always stays **consistent and fresh**

---

## 3) Eviction Policy

Defines how cache handles **memory limits**

### Why needed?
Cache has limited size → must remove old data when full

---

### Types:

- **No Eviction:**  
  Cache full → new writes fail  

- **LRU (Least Recently Used):**  
  Removes least recently accessed data  

- **LFU (Least Frequently Used):**  
  Removes least frequently accessed data  

- **TTL-Based:**  
  Removes data based on expiration time  

---

##  Additional Insights

 **When NOT to use caching:**
- Highly dynamic data (e.g., stock prices, real-time systems)
- Sensitive data (without proper security controls)
- Low-read, high-write systems  

---