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


### Architecture Overview

1.  **User Trigger (The Producer)**
    * A user signs up on the application.
    * The main application process creates a **task** containing the signup data.

2.  **Message Queue (The Buffer)**
    * The task is **serialized** (converted from a native object to a format like JSON) and stored in a **Queue** (e.g., Redis, RabbitMQ).
    * This ensures the main process isn't slowed down by waiting for an email to send.

3.  **The Consumer (Background Process)**
    * A separate process (the **Consumer**) polls the queue and pulls the task out.
    * **Deserialization:** The consumer converts the raw data (JSON/String) back into a native language structure (Python `dict`, Go `struct`, or Node.js `object`).

4.  **The Task Handler**
    * The consumer passes the data to a **Handler**.
    * The Handler's job is to structure the payload:
        * Generating HTML templates for the email.
        * Defining sender and receiver addresses.
        * Managing API keys for the mail provider.

5.  **External API Call**
    * The Handler calls the external **Email Service Provider** (e.g., SendGrid, AWS SES, Mailgun).

---

### Error Handling & Retries

If the task fails (e.g., the Email API is down), the system employs a reliability strategy:

#### Exponential Backoff
Instead of retrying immediately and overwhelming the server, the system waits for an increasing amount of time between each attempt.

**The Logic:**
* **1st Failure:** Retry in 2 seconds.
* **2nd Failure:** Retry in 4 seconds.
* **3rd Failure:** Retry in 8 seconds.
* **Formula:** $t = b^n$ (where $b$ is the base delay and $n$ is the number of attempts).

---

### 🛠️ Summary Table

| Component | Responsibility |
| :--- | :--- |
| **Producer** | Captures user data and pushes to the queue. |
| **Queue** | Holds tasks reliably until a consumer is ready. |
| **Consumer** | Runs in a separate process; handles the "heavy lifting." |
| **Deserialization** | Reverts the stored format back into a code-ready object. |
| **Handler** | Prepares the logic and calls external APIs. |
| **Exponential Backoff** | Ensures the system doesn't crash during outages by spacing out retries. |