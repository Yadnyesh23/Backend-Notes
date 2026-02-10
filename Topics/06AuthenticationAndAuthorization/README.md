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

## 4) OAuth (Open Authentication)
# The Evolution of OAuth: From 1.0 to 2.0

OAuth (Open Authorization) is the industry standard for **delegated access**. It allows a service to access your data on another service without you giving away your password.

---

## The Pre-OAuth Era: The "Password Sharing" Problem
Before OAuth, if a 3rd-party app (like a "Contact Importer") wanted to find your friends on Gmail, it would ask for your **actual Gmail username and password**.

**Problems with this:**
* **Trust:** You had to trust the app not to steal your password.
* **Over-access:** The app had full access to your emails, settings, and drive—not just your contacts.
* **Revocation:** To stop the app, you had to change your password, which broke every other app you used.

---

## OAuth 1.0: The Solution (Delegated Access)
OAuth 1.0 was introduced to allow "delegated access" using **digital signatures**.

### What problem did it solve?
It allowed users to grant access to their resources (like photos) to a third-party application without sharing their credentials.

### How it worked (The 3-Legged Flow):
1.  **Request Token:** The app asks the server for a temporary token.
2.  **User Authorization:** The user is redirected to the server to approve the request.
3.  **Exchange:** The app exchanges the temporary token for an **Access Token**.

### How it was different:
Unlike simple API keys or password sharing, OAuth 1.0 introduced a cryptographic handshake. Every request required a complex signature calculation using secrets.



---

## The Problem with OAuth 1.0
While secure, OAuth 1.0 was a nightmare for developers:
1.  **Complexity:** Calculating cryptographic signatures for every request was difficult and prone to errors.
2.  **Web-Centric:** It didn't work well for mobile apps or non-browser environments.
3.  **Performance:** The server had to validate a signature every single time a request was made.

---

##  OAuth 2.0: The Modern Standard
OAuth 2.0 was a complete rewrite designed for flexibility and ease of use.

### What problems did it solve?
* **Developer Experience:** Replaced complex signatures with simple **Bearer Tokens** (usually over HTTPS).
* **Flexibility:** Introduced "Grant Types" for different scenarios (Mobile apps, Web apps, Server-side).
* **Scalability:** Tokens can have expiration times and "Scopes" (specific permissions).

### How it works (The Standard Flow):
1.  **Authorization Request:** User clicks "Login with Google."
2.  **Authorization Grant:** User approves. The server sends back an **Authorization Code**.
3.  **Token Request:** The app sends that code + its Secret to the server.
4.  **Access Token:** The server sends back an `access_token` (and often a `refresh_token`).
5.  **API Access:** The app uses the token to get data.



### How it differs from OAuth 1.0:
| Feature | OAuth 1.0 | OAuth 2.0 |
| :--- | :--- | :--- |
| **Complexity** | High (Cryptographic signatures) | Low (Bearer tokens over HTTPS) |
| **Tokens** | No expiration (usually) | Expirable (with Refresh tokens) |
| **Roles** | 3 Roles (User, Consumer, Service) | 4 Roles (Resource Owner, Client, Authorization Server, Resource Server) |
| **Device Support** | Mainly Web | Web, Mobile, IoT, Smart TVs |

---

## Summary Mental Model
* **API Key:** Like a permanent building key.
* **OAuth 1.0:** Like a complex, coded handshake you have to perform every time you enter a room.
* **OAuth 2.0:** Like a **Hotel Key Card**. You show your ID at the front desk (Login), they give you a card (Token) that only opens your room and expires at 11:00 AM.

---

# 5) OIDC: OpenID Connect (The Identity Layer)

While OAuth 2.0 solved the problem of **Authorization** (what you can do), it didn't actually solve **Authentication** (who you are). OIDC was created to fill that gap.

---

## The Problem: "The Identity Gap"
Before OIDC, developers tried to use OAuth 2.0 for login. However, OAuth 2.0 only gives the app a "key" (token) to access data; it doesn't tell the app anything about the person holding the key.

**The "Valet Key" Analogy:**
* **OAuth 2.0** is like a valet key. It gives the driver permission to move your car, but the key doesn't tell the driver your name, address, or employee ID. 
* **OIDC** is like showing your **Driver’s License**. It proves exactly who you are.

---

## What is OIDC?
OIDC is a simple **identity layer** built on top of the OAuth 2.0 protocol. It allows clients to verify the identity of the end-user based on the authentication performed by an Authorization Server.

### What problem did it solve?
1.  **Standardized Login:** Before OIDC, every company (Facebook, Google, Twitter) had their own way of sharing user profiles. OIDC made it a universal standard.
2.  **SSO (Single Sign-On):** It allows you to use one account (like Google or Microsoft) to sign into thousands of different websites securely.
3.  **User Info:** It provides a standard way to get a user’s name, email, and profile picture.

---

##  How it works: The ID Token
OIDC uses the same flow as OAuth 2.0, but with one major addition: the **ID Token**.

When you log in via OIDC, the server sends back:
1.  **Access Token:** (OAuth 2.0) To call APIs.
2.  **ID Token:** (OIDC) A **JWT** (JSON Web Token) that contains user information.

### The ID Token Contents (Example):
```json
{
  "iss": "[https://accounts.google.com](https://accounts.google.com)",
  "sub": "1234567890",
  "aud": "my-travel-app-id",
  "exp": 1700000000,
  "name": "John Doe",
  "email": "john.doe@gmail.com",
  "picture": "[https://example.com/photo.jpg](https://example.com/photo.jpg)"
}