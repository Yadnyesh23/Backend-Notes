# Error Handling & Fault-Tolerant Systems
> A practical reference for backend engineers — technical depth with plain-language explanations

---

## 1. The Mindset

### Errors Are Inevitable
You can't prevent every error — the goal is to **detect, contain, and recover** quickly. Stop thinking *"how do I stop this from breaking?"* and start thinking *"what happens **when** this breaks?"*

### Fault-Tolerant Mindset
Design for worst-case scenarios *before* they happen. A well-built system keeps user transactions seamless even when internal components fail underneath.

---

## 2. Common Error Types

### A. Logic Errors
> 🔴 **Most dangerous type** — silent failures with no crash or exception

The system keeps running — no crash, no exception — but it produces **wrong results**. These are silent killers: everything looks fine on the outside while incorrect data flows through.

**Why they're hard to catch:**
- No visible crash or stack trace
- The app appears to work normally
- Usually discovered through wrong outputs or user complaints — too late

**Real-world example:**
> A bug in an e-commerce discount calculation causes the system to *pay users* instead of charging them — negative transaction values that only surface in financial reports.

**Root causes:**
- Misunderstood business requirements
- Incorrect algorithm implementation
- Edge cases not accounted for

**Prevention strategies:**
- Strong unit + integration tests
- Edge case validation (e.g. minimum price = 0)
- Code reviews focused on business logic
- Monitor for anomalous output values (e.g. negative transaction amounts)

**Impact:** Direct financial loss, eroded user trust, harder to debug than runtime errors

---

### B. Constraint Violations (Database Errors)
> 🟡 **Database layer** — application validation gaps exposed at the DB level

Errors thrown by the database when application-level rules are broken — such as inserting a duplicate value, violating a foreign key, or leaving a required field empty. These usually signal a gap in your **input validation layer**.

**Types of database errors:**
- Connection errors
- Constraint violations
- Validation failures
- Query errors

**Common examples:**
- Inserting a duplicate into a `UNIQUE` column (e.g. same email registered twice)
- Adding a record whose foreign key doesn't exist in the parent table
- Inserting `NULL` into a `NOT NULL` column

**Root causes:**
- Missing or weak input validation
- Race conditions (e.g. duplicate email on concurrent registration)
- Poor transaction management

**Prevention strategies:**
- Validate at both frontend and backend levels
- Use DB constraints as a **safety net** — not as primary validation
- Use proper transactions with rollback on failure
- Return user-friendly error messages, not raw DB errors

---

### C. External Service Errors
> 🟡 **Third-party / network** — failures outside your control

Failures that originate *outside your system* — third-party APIs going down, rate limits being hit, or network infrastructure breaking. You don't control these, but you need to **handle them gracefully**.

**Common failure modes:**
- **Network failure** — physical or routing-level connectivity loss between your server and the external service
- **Connection timeouts** — the external service accepted the connection but took too long to respond
- **DNS resolution failures** — your server couldn't resolve the hostname of the external service (e.g. `api.stripe.com` returns no IP)
- **Network partitions** — a split in the network causes your server and the external service to lose visibility of each other, even though both are running
- **Rate limiting (`HTTP 429`)** — you've exceeded the number of allowed requests in a given time window; the external API is rejecting you temporarily
- **Full service outage** — the third-party provider is completely down (e.g. AWS us-east-1 outage, Stripe incident)

**Real-world example:**
> Your payment service calls Stripe's API to charge a user. Stripe is experiencing an incident and returns `503 Service Unavailable`. Without proper handling, your app crashes or charges the user twice on retry — causing both financial and trust damage.

**Root causes:**
- Over-reliance on external services with no fallback plan
- No retry logic or poorly implemented retries (e.g. hammering a rate-limited API)
- Missing timeouts on outbound HTTP calls — your thread hangs indefinitely
- No monitoring or alerting when a dependency goes down

**Why they are critical:**
- Can bring down core user-facing features (e.g. payments, auth, notifications)
- Hard to reproduce locally — usually only surface in production
- Can cascade into internal failures if not isolated (see: circuit breaker pattern)

**Prevention strategies:**
- Set explicit **connection and read timeouts** on every outbound HTTP call
- Implement **retry logic with exponential backoff** — wait longer between each retry (e.g. 1s → 2s → 4s → give up)
- Use the **circuit breaker pattern** — after N consecutive failures, stop calling the service for a period and return a fallback response immediately
- Store critical operations (e.g. sending an email, processing a webhook) in a **queue** so they can be retried later without losing data
- Monitor third-party uptime via status pages and alert on elevated error rates
- Design **graceful degradation** — if the recommendation service is down, show a default list instead of a blank screen

---

### D. Input Validation Errors
> 🔵 **API entry point** — bad data caught before it causes damage

Incorrect data hitting your API — wrong types, invalid formats, out-of-range values. Caught early, these return an **HTTP 400 Bad Request** before any damage is done.

Think of input validation as your API's bouncer: it checks IDs at the door so that garbage data never makes it into your business logic or database.

**What to validate:**
- Data types
- Required fields
- String formats (email, UUID, etc.)
- Numeric ranges
- Enum/allowed values

---

### E. Configuration Errors
> ⚪ **Server startup** — misconfigured environment caught at boot time

Server-side issues caused by missing or misconfigured **environment variables**, secrets, or settings — typically surfacing at startup time before the app is even ready to serve traffic.

> **Rule of thumb:** Validate all required config values on boot and **fail fast** with a clear error message. A hard crash at startup is far better than a silent misconfiguration causing subtle failures in production.

**Common examples:**
- Missing `DB_URL` environment variable
- Invalid or expired API key
- Wrong port binding
- Missing `JWT_SECRET`

---

## Quick Reference

| Type | Severity | When It Occurs | HTTP Signal |
|---|---|---|---|
| Logic Errors | 🔴 Critical | Runtime — silent | None (no crash) |
| Constraint Violations | 🟡 High | DB write operations | `500` if unhandled |
| External Service Errors | 🟡 High | Any outbound call | `502` / `504` |
| Input Validation | 🔵 Medium | API entry point | `400 Bad Request` |
| Configuration Errors | ⚪ Startup | Server boot | App fails to start |