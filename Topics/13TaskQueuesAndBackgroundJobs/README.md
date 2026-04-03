# Background Jobs

## 1. What are Background Jobs?

> **Definition:** Any logic that runs asynchronously outside the main request-response cycle.

### Examples
* **Email Notifications:** Sending a "Welcome" email after a user signs up so they don't have to wait for the mail server before seeing their dashboard.
* **Image Processing:** Generating multiple thumbnail sizes or applying filters to an uploaded photo in the background.
* **Data Exports:** Generating massive CSV or PDF reports that might take 30+ seconds to compile.
* **Third-Party Syncing:** Pushing data to a CRM (like Salesforce) or updating an external search index (like Algolia) without blocking the UI.

### Why Use Them?
The primary goal is to **offload time-consuming, non-critical tasks** so the main backend API remains responsive and prevents request timeouts.

| Benefit | Description |
| :--- | :--- |
| **Responsiveness** | The user gets an immediate "Success" message while the work happens later. |
| **Scalability** | You can scale your background "workers" independently from your web servers. |
| **Resiliency** | If a job fails (e.g., an external API is down), it can be retried automatically without crashing the user's session. |

---

### How it Works (Conceptual Flow)



1. **Producer:** Your API receives a request and "pushes" a task to a queue.
2. **Broker:** A storage layer (like Redis or RabbitMQ) holds the task.
3. **Worker:** A separate process pulls the task from the queue and executes the logic.