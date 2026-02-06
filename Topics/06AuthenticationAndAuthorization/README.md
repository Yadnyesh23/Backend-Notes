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
