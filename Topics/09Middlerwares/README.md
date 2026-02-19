# Middlewares: The Request Pipeline

---

## What is Middleware?

Middleware is a function (or component) that sits **between the incoming request and your controller/handler**.

It can:

- Inspect the request  
- Modify the request  
- Block the request  
- Modify the response  
- Log the request  
- Add security checks  

Before your controller even runs.

Think of middleware as:

>  Security checkpoints before entering the main building.

---

## 🏗 Where Middleware Sits in the Flow

Client
↓
Middleware 1
↓
Middleware 2
↓
Middleware 3
↓
Controller (Handler)
↓
Service
↓
Repository
↓
Database


Every request passes through middleware **before reaching the controller**.

---

## Why is Middleware Needed?

Without middleware:

- Controllers become overloaded
- Security logic gets duplicated
- Logging logic repeats everywhere
- Hard to enforce global policies

Middleware solves:

- Centralized security
- Centralized logging
- Centralized validation
- Cleaner controllers
- Better scalability

---

## What Problem Does It Solve?

### Repetition Problem

Instead of writing authentication logic in every controller:

```python
if not verify_token():
    return 401
```

## Real Example Flow

User sends request:

```
GET /profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

Step 1️⃣ CORS Middleware

Checks: Is this frontend domain allowed?

If not: Reject request immediately

Step 2️⃣ Rate Limiter Middleware

Checks: Has this IP made more than 100 requests/min?

If yes: Return 429 Too Many Requests

Step 3️⃣ Auth Middleware
Extracts JWT token
Verifies signature
Checks expiration

If invalid: Return 401 Unauthorized

If valid: Attach user_id to request object

Step 4️⃣ Logger Middleware

Logs:
Endpoint
Method
IP
Timestamp
Response status

Step 5️⃣ Controller Executes

Now the request reaches controller safely.
Controller already knows:
User is authenticated
Request is valid
Rate limit is safe
So controller only focuses on business logic.

| Middleware | Purpose |
| :--- | :--- |
| **CORS** | Checks if the frontend domain is allowed to talk to the backend. |
| **Auth** | Verifies JWT tokens or Session IDs. Aborts with `401 Unauthorized` if invalid. |
| **Rate Limiter** | Prevents a single IP from making too many requests (e.g., 100 req/min). |
| **Logger** | Records every request for debugging and auditing. |
| **Error Handler** | Catches unhandled exceptions. |
| **Request Timer** | Measures response time. |
| **Compression** | Compresses responses |

## Middleware Ordering Is Important
### Correct order:
1️⃣ CORS
2️⃣ Rate Limiter
3️⃣ Authentication
4️⃣ Logging
5️⃣ Controller
6️⃣ Global Error Handler (last)

## What Happens If Order Is Wrong?

(1)If Auth runs before CORS → Browser may block request unexpectedly.
(2) If Rate Limiter runs after controller → Attack still hits business logic.
(3) If Logger runs before Auth → Sensitive data may be logged incorrectly.