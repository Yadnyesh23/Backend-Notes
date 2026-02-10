## Foundations
- **Authentication (AuthN):** "Who are you?" (Identity).
- **Authorization (AuthZ):** "What are you allowed to do?" (Permissions).

## 📦 Key Technologies

### 1. Sessions (Stateful)

- **What it is:**  
  A session is a server-side mechanism used to remember a user across multiple HTTP requests in an otherwise stateless protocol.

- **How it works:**  
  1. User logs in with credentials.  
  2. Server verifies the credentials and creates a session.  
  3. Server stores session data (e.g., userId, role, login status) in Redis/DB/memory.  
  4. Server sends a `session_id` to the client via cookies.  
  5. On every subsequent request (e.g., `/profile`), the browser automatically sends the `session_id` back to the server via cookies.  
  6. Server validates the `session_id`, retrieves session data, and authorizes the user.

- **Mechanism:**  
  Server stores session data in Redis/DB/memory; Client stores only the `session_id` in cookies.

- **Use Case:**  
  Web applications requiring high security, server-side control, and instant session revocation (e.g., login systems, admin panels, dashboards).

- **Pros:**  
  - Secure (sensitive data stays on the server)  
  - Easy to invalidate sessions (logout = delete session)  
  - Simple authentication flow for traditional web apps

- **Cons:**  
  - Consumes server memory/storage  
  - Scaling is harder (requires shared session store across servers)  
  - Not ideal for stateless APIs and mobile-first systems

### 2. JWT (Stateless)

- **What it is:**  
  JWT (JSON Web Token) is a stateless authentication mechanism where the server issues a signed token containing user-related data, and the client sends this token with every request for verification.

- **Mechanism:**  
  1. User logs in and sends credentials to the server.  
  2. Server verifies credentials and generates a JWT.  
  3. JWT contains encoded user data (payload) and is digitally signed using a secret/private key.  
  4. Server sends the JWT to the client.  
  5. Client stores the token (e.g., in memory or local storage).  
  6. On every subsequent request, the client sends the JWT in the `Authorization: Bearer <token>` header.  
  7. Server verifies the token signature and expiry, extracts the payload, and authorizes the request.  

- **Use Case:**  
  Ideal for microservices, mobile APIs, public APIs, and high-scale distributed systems where stateless authentication and easy horizontal scaling are required.

- **Structure:**  
  A JWT consists of three Base64-encoded parts separated by dots:  


- **Header:**  
  Contains metadata about the token, such as the signing algorithm and token type.
  ```json
  {
    "alg": "HS256",
    "typ": "JWT"
  }
  ```

- **Payload:**  
  Contains claims (data) about the user and token, such as `userId`, `role`, and expiration time (`exp`).
  ```json
  {
    "userId": 7,
    "role": "user",
    "exp": 1700000000
  }
  ```

- **Signature:**  
  A cryptographic signature created using the encoded header, encoded payload, and a secret/private key.  
  It ensures the token has not been tampered with.

- **Pros:**  
- Stateless (no server-side session storage)  
- Easy to scale across multiple servers  
- Fast authentication (no Redis/DB lookup)  
- Well-suited for APIs and microservices  

- **Cons:**  
- Cannot be instantly revoked once issued  
- Logout is harder to implement  
- Token size is larger than a session ID  
- Sensitive data should not be stored in the payload


### 3. OAuth 2.0 & OIDC
- **OAuth 2.0:** Delegation. (e.g., Letting an app post to your Twitter).
- **OpenID Connect:** Identity. (e.g., "Login with Google").

### Cookies

- **What it is:**  
  A cookie is a small piece of data stored in the browser and automatically sent with every HTTP request to the same domain.

- **Why cookies exist:**  
  Cookies solve HTTP’s stateless nature by allowing servers to store information on the client and receive it back on subsequent requests.

- **How it works:**  
  1. Server sends a `Set-Cookie` header in the response.  
  2. Browser stores the cookie.  
  3. Browser automatically sends the cookie with future requests.

- **Common Uses:**  
  - Storing session IDs  
  - Storing JWTs  
  - User preferences (theme, language)  
  - Analytics and tracking

- **Cookies vs Sessions vs JWT:**  

  | Concept | Purpose | Where Data Lives |
  |------|--------|------------------|
  | Cookie | Storage + transport | Browser |
  | Session | Stateful authentication | Server |
  | JWT | Stateless authentication | Client |

- **Relation with Sessions:**  
  Cookies commonly store a `session_id`, while the actual session data (userId, role, login state) is stored on the server (Redis/DB).

- **Relation with JWT:**  
  Cookies can store JWTs, which contain signed user data and are verified by the server on each request.

- **Common Misconceptions:**  
  - Cookies themselves are not insecure; security depends on proper flags.  
  - Cookies and sessions are not the same thing.  
  - JWT does not replace cookies; it only replaces server-side sessions.  
  - Cookies should never store sensitive data like passwords.

- **Important Cookie Flags:**  
  - `HttpOnly`: Prevents JavaScript access to cookies.  
  - `Secure`: Sends cookies only over HTTPS.  
  - `SameSite`: Helps prevent CSRF attacks.

# Understanding Cookies: What do they actually store?

A cookie stores small, simple **key–value data** that the browser automatically sends to the server with every request. 

> **The Golden Rule:** A cookie is a pointer, not a database. It's meant to be lightweight.

---

## 🔍 Anatomy of a Cookie
When a server wants to set a cookie, it sends a header like this:
`Set-Cookie: sessionId=abc123; HttpOnly; Secure; SameSite=Lax`

**The Browser Stores:**
* **Key:** `sessionId`
* **Value:** `abc123`

---

## 🛠 Real-World Examples

### 1. Blog App (Session-based Login)
* **On Login (Server Response):** `Set-Cookie: sessionId=xyz789`
* **On `/profile` (Browser Request):** The browser automatically attaches `Cookie: sessionId=xyz789`.

📌 **Note:** The cookie does **not** store your username or email. Those details live in your Session storage (Redis/DB) on the server.

### 2. E-commerce App (Preferences vs. Cart)
* **User Preference:** `Set-Cookie: currency=INR`
* **The Cart:** Usually stored in a Database or Server Session.

❌ **Why not the cart?** Cart data is often too large for the cookie size limit and is insecure if stored client-side.

### 3. JWT (JSON Web Token)
The server sends a signed string:
`Set-Cookie: accessToken=eyJhbGciOiJIUzI1Ni...`

**Inside the JWT (Decoded on Server):**
```json
{
  "userId": 7,
  "role": "user",
  "exp": 1700000000
}
```

## Types of Authentication Models

### 1) Stateful Authentication
Server stores user session data and identifies users using a session ID sent with each request.

### 2) Stateless Authentication
Server does not store sessions; client sends a signed token (like JWT) on every request for verification.

### 3) API Key Authentication
Client authenticates by sending a static API key that identifies and authorizes access to an application or service.

### 4) OAuth 2.0 Authentication
User authenticates via a trusted third-party provider, which issues tokens to access resources without sharing passwords.


## 1) Stateful Authentication

In stateful authentication, the server maintains the user’s authentication state.

**Step 1: Login**
- User logs in using username and password.
- Server validates the credentials.
- Server creates a session and stores session data (e.g. `userId`, role, login state) in memory or a database (Redis/DB).
- A unique `session_id` is generated.

**Step 2: Session Sharing**
- Server sends the `session_id` to the client via a cookie.

**Step 3: Authenticated Requests**
- On every request, the browser automatically sends the `session_id` via cookies.
- Server looks up the session data using the `session_id`.
- If the session is valid, access is granted.

📌 **Important Notes**
- Passwords are **never stored** in sessions.
- Session data lives on the **server**, not the client.


## 2) Stateless Authentication

In stateless authentication, the server does not store any session data.

**Step 1: Login**
- User logs in using username and password.
- Server validates the credentials.
- Server generates a **signed JWT** containing user-related claims (e.g. `userId`, role, expiry).

**Step 2: Token Delivery**
- The signed JWT is sent to the client (commonly via cookies or local storage).

**Step 3: Authorized Requests**
- For every protected request, the client sends the JWT  
  (usually in the `Authorization: Bearer <token>` header).

**Step 4: Token Verification**
- Server verifies the JWT signature and expiry.
- If valid, user identity is extracted from the token and access is granted.

📌 **Why JWT is Stateless**
- Server does **not store user session data**.
- All required authentication data is carried inside the token itself.
- Server only verifies the token signature — no database lookup is required.

## 3) API Keys: The "Software Password"

An API Key is a unique identifier used to authenticate requests between different software systems. It is primarily used for **Machine-to-Machine** or **Service-to-UI** interactions.

### The Need & Problem Solved
In modern development, servers need to talk to other servers. API Keys solve three main problems:

1.  **Identification:** It tells the provider *who* is calling (e.g., "This is the 'WeatherApp' calling").
2.  **Rate Limiting:** It prevents a single user from crashing the server by limiting them to a specific number of requests per minute.
3.  **Billing & Tracking:** For paid services (like Google Maps or OpenAI), the key tracks usage so the provider knows how much to charge you.

###  When is it used?
* **Third-party Integrations:** When your app needs to pull data from a service like GitHub, Stripe, or Google Maps.
* **Backend Automation:** When your server needs to trigger an action on another server (e.g., sending an email via SendGrid).
* **Public Data Fetching:** Accessing live data feeds like stock prices or weather updates.

###  Example Workflow
1.  **Obtain:** You sign up for an API (e.g., OpenWeather) and receive a key: `xyz-789-api-key`.
2.  **Request:** Your server sends this key in the header or URL:
    `GET /data?city=London&apikey=xyz-789-api-key`
3.  **Validate:** The platform's server checks the key. If valid, it grants your server access to the data.

###  Security Note
API keys are long-lived and "static." If someone steals your key, they can impersonate your application. **Never** commit API keys to public GitHub repositories; always use `.env` files.