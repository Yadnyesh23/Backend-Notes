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
