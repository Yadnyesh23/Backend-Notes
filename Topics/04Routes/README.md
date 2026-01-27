# Backend Routing Fundamentals

A comprehensive guide to how backend systems map incoming HTTP requests to specific business logic, based on the tutorial by Sriniously.

## 🚀 Overview
Routing is the "Where" of a request. It combines the **HTTP Method** (Intent) and the **URL Path** (Location) to find the correct handler on the server.

## 🛠 Core Concepts

### 1. Static vs. Dynamic Routing
* **Static Routes:** Constant paths like `/api/books`. These always point to the same resource.
* **Dynamic Routes:** Paths containing variables, known as **Path Parameters**.
    * *Example:* `/api/users/:id` where `:id` can be `123`.
    * *Usage:* Identifying a specific resource semantically.

### 2. Query Parameters
Used primarily in `GET` requests to send metadata without a request body.
* **Syntax:** `/api/books?page=2&limit=20`
* **Common Use Cases:**
    * Pagination (e.g., `page=2`)
    * Filtering (e.g., `category=tech`)
    * Sorting (e.g., `sort=asc`)

### 3. Nested Routing
Expresses relationships between resources.
* **Example:** `/api/users/:userId/posts/:postId`
* **Meaning:** "Fetch a specific post belonging to a specific user."

### 4. API Versioning & Deprecation
Allows for breaking changes without crashing existing client applications.
* **V1:** `/api/v1/products` (Old format)
* **V2:** `/api/v2/products` (New format with updated schema)
* **Benefit:** Provides a migration window for frontend engineers.

### 5. Catch-all Routes
A safety net for undefined endpoints.
* **Handler:** Often defined as `app.get('*', ...)`
* **Purpose:** Returns a clean `404 Not Found` JSON message instead of a raw server error.

## 📖 Summary Table
| Feature | Syntax Example | Primary Use |
| :--- | :--- | :--- |
| **Path Param** | `/users/:id` | Identifying a resource |
| **Query Param** | `/search?q=node` | Filtering/Pagination |
| **Versioning** | `/v1/items` | Managing breaking changes |
| **Nested Route** | `/user/1/logs` | Hierarchical data |

---
*Notes synthesized from [Sriniously's Backend Series](https://youtu.be/SubuU1iOC2s)*