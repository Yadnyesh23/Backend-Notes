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
-Connection errors: Occur when the application fails to connect to the database due to issues like wrong credentials, server downtime, or network problems.
-Constraint violations: Happen when a database rule (like primary key, foreign key, or unique constraint) is broken during data insertion or update.
-Validation failures: Arise when input data does not meet required formats, ranges, or conditions before being stored in the database.
-Query errors: Occur when there is a mistake in the SQL query syntax or logic, causing the database to fail executing it.

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

Incorrect or malformed data sent by a client to your API — wrong types, missing required fields, invalid formats, or out-of-range values. These should be caught **at the boundary** of your system and rejected immediately with a clear `HTTP 400 Bad Request`, before the data ever touches your business logic or database.

Think of input validation as your API's bouncer: it checks credentials at the door so that garbage data never gets a chance to corrupt your system from the inside.

**Real-world example:**
> A user submits a registration form with `age: "twenty-three"` instead of `age: 23`. Without validation, this string propagates into your database, breaks downstream analytics queries, and corrupts age-based eligibility logic — all from one bad input.

**Common examples:**
- Sending `"price": "free"` when the field expects a number
- Omitting a required field like `email` in a signup request
- Passing a date as `"31-13-2024"` — an invalid month
- Submitting a value outside an allowed range (e.g. `quantity: -5` on an order)
- Passing an invalid enum value (e.g. `role: "superadmin"` when only `"admin"` and `"user"` exist)

**Root causes:**
- No server-side validation (relying only on frontend validation — never safe)
- Trusting client input blindly — clients can be manipulated or bypassed entirely (e.g. via Postman or curl)
- Vague or missing API contracts (no schema, no documentation of accepted formats)
- Validation logic scattered across the codebase instead of centralised at the entry point

**Why they are critical:**
- Unvalidated input is the root cause of many security vulnerabilities (SQL injection, XSS, buffer overflows)
- Bad data that slips in is expensive to clean up — you may not discover it until it breaks something downstream
- Inconsistent validation leads to unpredictable system behaviour
- Poor error messages frustrate developers integrating with your API

**Prevention strategies:**
- Always validate on the **server side**, regardless of what the frontend does — frontend validation is UX, server-side validation is security
- Use a **schema validation library** (e.g. Zod, Joi, Pydantic, Yup) to define and enforce the shape of every incoming request
- Validate **data types, required fields, string formats, numeric ranges, and enum values** at the API entry point
- Return **descriptive error messages** that tell the caller exactly what's wrong: `"field 'email' must be a valid email address"` not just `"invalid input"`
- Document your API contract with tools like OpenAPI/Swagger so clients know what's expected before they even send a request

---

### E. Configuration Errors
> ⚪ **Server startup** — misconfigured environment caught at boot time

Server-side issues caused by missing, incorrect, or misconfigured **environment variables**, secrets, feature flags, or infrastructure settings. These typically surface at **startup time** — before your app is ready to serve any traffic — though poorly structured apps sometimes let them slip through to runtime, where they cause harder-to-diagnose failures.

Think of configuration as the wiring behind the walls. When it's done right, nobody notices. When it's wrong, nothing works — and the error message often points nowhere near the actual problem.

**Real-world example:**
> Your app deploys successfully to production, but `DATABASE_URL` was never set in the environment. The server starts, accepts incoming traffic, and then throws a cryptic `connection refused` error on the first database call — affecting every single user while the team scrambles to find why it worked fine in staging.

**Common examples:**
- Missing `DATABASE_URL` — the app starts but crashes on the first DB query
- Wrong `JWT_SECRET` in production — tokens signed in staging are rejected in production, logging everyone out
- `NODE_ENV` set to `development` in production — debug logs exposed, optimisations disabled
- Missing third-party API keys (e.g. `STRIPE_SECRET_KEY`, `SENDGRID_API_KEY`) — payment or email features silently fail
- Wrong port binding — app starts on port `3000` but the load balancer expects `8080`
- Incorrect cloud storage bucket name — file uploads appear to succeed but are written to a non-existent or wrong bucket

**Root causes:**
- No validation of environment variables at startup
- Differences between local, staging, and production environments that aren't documented or enforced
- Secrets managed manually and inconsistently (copy-paste errors, forgotten variables)
- No `.env.example` file or environment variable documentation for new team members or deployments

**Why they are critical:**
- Can silently break entire features in production while the app appears to be "running"
- Misconfigured secrets (e.g. using a test Stripe key in production) can cause real financial or data consequences
- Hard to debug without proper startup logging — the error often surfaces far from the misconfigured variable
- Affect the entire application, not just one user or one request

**Prevention strategies:**
- **Validate all required environment variables at startup** and fail fast with a descriptive error: `Missing required env var: DATABASE_URL`. A hard crash at boot is far better than a running app with missing config
- Use a **config validation library** (e.g. `envalid` for Node.js, `pydantic-settings` for Python) to enforce types, required fields, and allowed values on startup
- Maintain a **`.env.example` file** in your repo — a template listing every required variable with placeholder values, so no deployment is missing a variable by accident
- Use a **secrets manager** (e.g. AWS Secrets Manager, HashiCorp Vault, Doppler) instead of manually copying secrets across environments
- Keep **environment parity** between staging and production as close as possible — surprises in production often come from differences that weren't caught in staging
- Log the loaded configuration summary at startup (with secrets redacted) so you can immediately confirm what values the app is running with