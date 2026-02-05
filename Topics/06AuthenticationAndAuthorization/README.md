## Foundations
- **Authentication (AuthN):** "Who are you?" (Identity).
- **Authorization (AuthZ):** "What are you allowed to do?" (Permissions).

## 📦 Key Technologies

### 1. Sessions (Stateful)
- **Mechanism:** Server stores data in Redis/DB; Client holds a `session_id`.
- **Use Case:** Web applications requiring high security and instant session revocation.